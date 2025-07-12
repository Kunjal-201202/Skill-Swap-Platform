const express = require('express');
const { body, validationResult, query } = require('express-validator');
const User = require('../models/User');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/search
// @desc    Search users by skills
// @access  Public (with optional auth)
router.get('/search', [
  optionalAuth,
  query('skill').optional().trim(),
  query('location').optional().trim(),
  query('level').optional().isIn(['beginner', 'intermediate', 'advanced', 'expert']),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { skill, location, level, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isProfilePublic: true, isBanned: false };

    if (skill) {
      query.$or = [
        { 'skillsOffered.name': { $regex: skill, $options: 'i' } },
        { 'skillsWanted.name': { $regex: skill, $options: 'i' } }
      ];
    }

    if (level) {
      query.$and = [
        {
          $or: [
            { 'skillsOffered.level': level },
            { 'skillsWanted.level': level }
          ]
        }
      ];
    }

    if (location) {
      query.$or = [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.state': { $regex: location, $options: 'i' } },
        { 'location.country': { $regex: location, $options: 'i' } }
      ];
    }

    // Exclude current user from results
    if (req.user) {
      query._id = { $ne: req.user._id };
    }

    const users = await User.find(query)
      .select('name avatar bio skillsOffered skillsWanted rating location')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('User search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Public (with optional auth)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name avatar bio skillsOffered skillsWanted rating location availability isProfilePublic');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if profile is public or if user is viewing their own profile
    if (!user.isProfilePublic && (!req.user || req.user._id.toString() !== user._id.toString())) {
      return res.status(403).json({ message: 'Profile is private' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  protect,
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('bio').optional().trim().isLength({ max: 500 }),
  body('avatar').optional().trim(),
  body('isProfilePublic').optional().isBoolean(),
  body('location.city').optional().trim(),
  body('location.state').optional().trim(),
  body('location.country').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const updateFields = {};
    const allowedFields = ['name', 'bio', 'avatar', 'isProfilePublic', 'location'];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/skills-offered
// @desc    Add skill to offered skills
// @access  Private
router.post('/skills-offered', [
  protect,
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('level').isIn(['beginner', 'intermediate', 'advanced', 'expert']),
  body('description').optional().trim().isLength({ max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, level, description } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if skill already exists
    const skillExists = user.skillsOffered.find(skill => 
      skill.name.toLowerCase() === name.toLowerCase()
    );

    if (skillExists) {
      return res.status(400).json({ message: 'Skill already exists in your offered skills' });
    }

    user.skillsOffered.push({ name, level, description });
    await user.save();

    res.json(user.skillsOffered);
  } catch (error) {
    console.error('Add offered skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/skills-wanted
// @desc    Add skill to wanted skills
// @access  Private
router.post('/skills-wanted', [
  protect,
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('level').isIn(['beginner', 'intermediate', 'advanced', 'expert']),
  body('description').optional().trim().isLength({ max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, level, description } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if skill already exists
    const skillExists = user.skillsWanted.find(skill => 
      skill.name.toLowerCase() === name.toLowerCase()
    );

    if (skillExists) {
      return res.status(400).json({ message: 'Skill already exists in your wanted skills' });
    }

    user.skillsWanted.push({ name, level, description });
    await user.save();

    res.json(user.skillsWanted);
  } catch (error) {
    console.error('Add wanted skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/skills-offered/:skillId
// @desc    Remove skill from offered skills
// @access  Private
router.delete('/skills-offered/:skillId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.skillsOffered = user.skillsOffered.filter(skill => 
      skill._id.toString() !== req.params.skillId
    );

    await user.save();
    res.json(user.skillsOffered);
  } catch (error) {
    console.error('Remove offered skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/skills-wanted/:skillId
// @desc    Remove skill from wanted skills
// @access  Private
router.delete('/skills-wanted/:skillId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.skillsWanted = user.skillsWanted.filter(skill => 
      skill._id.toString() !== req.params.skillId
    );

    await user.save();
    res.json(user.skillsWanted);
  } catch (error) {
    console.error('Remove wanted skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/availability
// @desc    Update user availability
// @access  Private
router.put('/availability', [
  protect,
  body('availability').isObject(),
  body('availability.monday').optional().isBoolean(),
  body('availability.tuesday').optional().isBoolean(),
  body('availability.wednesday').optional().isBoolean(),
  body('availability.thursday').optional().isBoolean(),
  body('availability.friday').optional().isBoolean(),
  body('availability.saturday').optional().isBoolean(),
  body('availability.sunday').optional().isBoolean(),
  body('availability.timeSlots').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { availability: req.body.availability },
      { new: true, runValidators: true }
    );

    res.json(user.availability);
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 