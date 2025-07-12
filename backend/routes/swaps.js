const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Swap = require('../models/Swap');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/swaps
// @desc    Create a new swap request
// @access  Private
router.post('/', [
  protect,
  body('recipientId').isMongoId().withMessage('Valid recipient ID is required'),
  body('requestedSkill.name').trim().notEmpty().withMessage('Requested skill name is required'),
  body('requestedSkill.level').isIn(['beginner', 'intermediate', 'advanced', 'expert']),
  body('offeredSkill.name').trim().notEmpty().withMessage('Offered skill name is required'),
  body('offeredSkill.level').isIn(['beginner', 'intermediate', 'advanced', 'expert']),
  body('message').trim().notEmpty().isLength({ max: 1000 }).withMessage('Message is required and must be less than 1000 characters'),
  body('proposedDate').optional().isISO8601(),
  body('proposedLocation').optional().trim().isLength({ max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const {
      recipientId,
      requestedSkill,
      offeredSkill,
      message,
      proposedDate,
      proposedLocation
    } = req.body;

    // Check if recipient exists and is not banned
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (recipient.isBanned) {
      return res.status(400).json({ message: 'Cannot send swap request to banned user' });
    }

    // Check if recipient has the requested skill
    const hasRequestedSkill = recipient.skillsOffered.some(skill => 
      skill.name.toLowerCase() === requestedSkill.name.toLowerCase()
    );

    if (!hasRequestedSkill) {
      return res.status(400).json({ message: 'Recipient does not offer the requested skill' });
    }

    // Check if requester has the offered skill
    const requester = await User.findById(req.user._id);
    const hasOfferedSkill = requester.skillsOffered.some(skill => 
      skill.name.toLowerCase() === offeredSkill.name.toLowerCase()
    );

    if (!hasOfferedSkill) {
      return res.status(400).json({ message: 'You do not offer the skill you are trying to swap' });
    }

    // Check if there's already a pending swap between these users
    const existingSwap = await Swap.findOne({
      $or: [
        { requester: req.user._id, recipient: recipientId },
        { requester: recipientId, recipient: req.user._id }
      ],
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingSwap) {
      return res.status(400).json({ message: 'You already have a pending or active swap with this user' });
    }

    const swap = await Swap.create({
      requester: req.user._id,
      recipient: recipientId,
      requestedSkill,
      offeredSkill,
      message,
      proposedDate,
      proposedLocation
    });

    const populatedSwap = await Swap.findById(swap._id)
      .populate('requester', 'name avatar')
      .populate('recipient', 'name avatar');

    res.status(201).json(populatedSwap);
  } catch (error) {
    console.error('Create swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/swaps
// @desc    Get user's swaps (sent and received)
// @access  Private
router.get('/', [
  protect,
  query('status').optional().isIn(['pending', 'accepted', 'rejected', 'completed', 'cancelled']),
  query('type').optional().isIn(['sent', 'received']),
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

    const { status, type, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (type === 'sent') {
      query.requester = req.user._id;
    } else if (type === 'received') {
      query.recipient = req.user._id;
    } else {
      query.$or = [
        { requester: req.user._id },
        { recipient: req.user._id }
      ];
    }

    if (status) {
      query.status = status;
    }

    const swaps = await Swap.find(query)
      .populate('requester', 'name avatar')
      .populate('recipient', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Swap.countDocuments(query);

    res.json({
      swaps,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get swaps error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/swaps/:id
// @desc    Get specific swap details
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id)
      .populate('requester', 'name avatar email')
      .populate('recipient', 'name avatar email')
      .populate('messages.sender', 'name avatar');

    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user is part of this swap
    if (swap.requester._id.toString() !== req.user._id.toString() && 
        swap.recipient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(swap);
  } catch (error) {
    console.error('Get swap details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/swaps/:id/status
// @desc    Update swap status (accept/reject/complete/cancel)
// @access  Private
router.put('/:id/status', [
  protect,
  body('status').isIn(['accepted', 'rejected', 'completed', 'cancelled']),
  body('scheduledDate').optional().isISO8601(),
  body('scheduledLocation').optional().trim().isLength({ max: 200 }),
  body('cancellationReason').optional().trim().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { status, scheduledDate, scheduledLocation, cancellationReason } = req.body;

    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user can update this swap
    if (swap.requester.toString() !== req.user._id.toString() && 
        swap.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Validate status transitions
    if (status === 'accepted' && swap.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only recipient can accept a swap' });
    }

    if (status === 'completed' && swap.status !== 'accepted') {
      return res.status(400).json({ message: 'Can only complete accepted swaps' });
    }

    // Update swap
    await swap.updateStatus(status, req.user._id, cancellationReason);

    if (status === 'accepted' && scheduledDate) {
      swap.scheduledDate = scheduledDate;
      if (scheduledLocation) {
        swap.scheduledLocation = scheduledLocation;
      }
      await swap.save();
    }

    const updatedSwap = await Swap.findById(swap._id)
      .populate('requester', 'name avatar')
      .populate('recipient', 'name avatar');

    res.json(updatedSwap);
  } catch (error) {
    console.error('Update swap status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/swaps/:id/messages
// @desc    Add message to swap conversation
// @access  Private
router.post('/:id/messages', [
  protect,
  body('message').trim().notEmpty().isLength({ max: 1000 }).withMessage('Message is required and must be less than 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user is part of this swap
    if (swap.requester.toString() !== req.user._id.toString() && 
        swap.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if swap is still active
    if (['rejected', 'cancelled', 'completed'].includes(swap.status)) {
      return res.status(400).json({ message: 'Cannot send messages to inactive swaps' });
    }

    await swap.addMessage(req.user._id, req.body.message);

    const updatedSwap = await Swap.findById(swap._id)
      .populate('messages.sender', 'name avatar');

    res.json(updatedSwap.messages);
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/swaps/:id/rate
// @desc    Rate a completed swap
// @access  Private
router.post('/:id/rate', [
  protect,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment must be less than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { rating, comment } = req.body;

    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user is part of this swap
    if (swap.requester.toString() !== req.user._id.toString() && 
        swap.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if user can rate this swap
    if (!swap.canUserRate(req.user._id)) {
      return res.status(400).json({ message: 'Cannot rate this swap' });
    }

    // Add rating to swap
    await swap.addRating(req.user._id, rating, comment);

    // Update user's average rating
    const userToUpdate = swap.requester.toString() === req.user._id.toString() 
      ? swap.recipient 
      : swap.requester;
    
    const user = await User.findById(userToUpdate);
    if (user) {
      await user.updateRating(rating);
    }

    const updatedSwap = await Swap.findById(swap._id)
      .populate('requester', 'name avatar')
      .populate('recipient', 'name avatar');

    res.json(updatedSwap);
  } catch (error) {
    console.error('Rate swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 