const express = require('express');
const { body, validationResult, query } = require('express-validator');
const User = require('../models/User');
const Swap = require('../models/Swap');
const { protect, admin, superAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard analytics
// @access  Private (Admin)
router.get('/dashboard', [protect, admin], async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ 
      lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
    });
    const bannedUsers = await User.countDocuments({ isBanned: true });

    // Get swap statistics
    const totalSwaps = await Swap.countDocuments();
    const pendingSwaps = await Swap.countDocuments({ status: 'pending' });
    const completedSwaps = await Swap.countDocuments({ status: 'completed' });
    const cancelledSwaps = await Swap.countDocuments({ status: 'cancelled' });

    // Get recent activity
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');

    const recentSwaps = await Swap.find()
      .populate('requester', 'name')
      .populate('recipient', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('requester recipient status createdAt');

    // Get top skills
    const skillStats = await User.aggregate([
      { $unwind: '$skillsOffered' },
      {
        $group: {
          _id: '$skillsOffered.name',
          count: { $sum: 1 },
          avgLevel: { $avg: { $indexOfArray: ['beginner', 'intermediate', 'advanced', 'expert', '$skillsOffered.level'] } }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        banned: bannedUsers
      },
      swaps: {
        total: totalSwaps,
        pending: pendingSwaps,
        completed: completedSwaps,
        cancelled: cancelledSwaps
      },
      recentActivity: {
        users: recentUsers,
        swaps: recentSwaps
      },
      topSkills: skillStats
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination and filters
// @access  Private (Admin)
router.get('/users', [
  protect, 
  admin,
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('search').optional().trim(),
  query('role').optional().isIn(['user', 'admin', 'moderator']),
  query('status').optional().isIn(['active', 'banned'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { page = 1, limit = 20, search, role, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status === 'banned') {
      query.isBanned = true;
    } else if (status === 'active') {
      query.isBanned = false;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
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
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id/ban
// @desc    Ban a user
// @access  Private (Admin)
router.put('/users/:id/ban', [
  protect, 
  admin,
  body('reason').trim().notEmpty().withMessage('Ban reason is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { reason } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent banning other admins (unless super admin)
    if (user.role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only super admins can ban other admins' });
    }

    user.isBanned = true;
    user.banReason = reason;
    await user.save();

    res.json({ message: 'User banned successfully', user });
  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id/unban
// @desc    Unban a user
// @access  Private (Admin)
router.put('/users/:id/unban', [protect, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBanned = false;
    user.banReason = undefined;
    await user.save();

    res.json({ message: 'User unbanned successfully', user });
  } catch (error) {
    console.error('Unban user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private (Super Admin)
router.put('/users/:id/role', [
  protect, 
  superAdmin,
  body('role').isIn(['user', 'moderator', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/swaps
// @desc    Get all swaps with pagination and filters
// @access  Private (Admin)
router.get('/swaps', [
  protect, 
  admin,
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('status').optional().isIn(['pending', 'accepted', 'rejected', 'completed', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { page = 1, limit = 20, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (status) {
      query.status = status;
    }

    const swaps = await Swap.find(query)
      .populate('requester', 'name email')
      .populate('recipient', 'name email')
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

// @route   DELETE /api/admin/swaps/:id
// @desc    Delete a swap (moderation)
// @access  Private (Admin)
router.delete('/swaps/:id', [protect, admin], async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    await Swap.findByIdAndDelete(req.params.id);

    res.json({ message: 'Swap deleted successfully' });
  } catch (error) {
    console.error('Delete swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get detailed analytics
// @access  Private (Admin)
router.get('/analytics', [protect, admin], async (req, res) => {
  try {
    // User growth over time
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ]);

    // Swap completion rate
    const swapStats = await Swap.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Top locations
    const topLocations = await User.aggregate([
      { $match: { 'location.city': { $exists: true, $ne: '' } } },
      {
        $group: {
          _id: '$location.city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Average ratings
    const avgRating = await User.aggregate([
      { $match: { 'rating.count': { $gt: 0 } } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating.average' },
          totalRatings: { $sum: '$rating.count' }
        }
      }
    ]);

    res.json({
      userGrowth,
      swapStats,
      topLocations,
      avgRating: avgRating[0] || { avgRating: 0, totalRatings: 0 }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/reports
// @desc    Get reported content (placeholder for future implementation)
// @access  Private (Admin)
router.get('/reports', [protect, admin], async (req, res) => {
  try {
    // This would be implemented when reporting system is added
    res.json({ 
      message: 'Reporting system not yet implemented',
      reports: [] 
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 