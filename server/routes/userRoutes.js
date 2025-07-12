const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create or update profile
router.post('/profile', async (req, res) => {
  const {
    email,
    name,
    bio,
    contact,
    skillsOffered,
    skillsWanted,
    availability,
    portfolioLink,
    skillVerificationStatus,
    profilePic
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user profile
      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.contact = contact || user.contact;
      user.skillsOffered = skillsOffered || user.skillsOffered;
      user.skillsWanted = skillsWanted || user.skillsWanted;
      user.availability = availability || user.availability;
      user.portfolioLink = portfolioLink || user.portfolioLink;
      user.skillVerificationStatus = skillVerificationStatus || user.skillVerificationStatus;
      user.profilePic = profilePic || user.profilePic;

      await user.save();
      res.status(200).json({ message: 'Profile updated successfully', user });
    } else {
      // Create new profile
      user = await User.create({
        email,
        name,
        bio,
        contact,
        skillsOffered,
        skillsWanted,
        availability,
        portfolioLink,
        skillVerificationStatus,
        profilePic
      });
      res.status(201).json({ message: 'Profile created successfully', user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Get profile by email
router.get('/userprofile/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get skills for a user (for marketplace)
router.get('/skills/:userId', async (req, res) => {
  try {
    // For now, we'll use a test user. In a real app, you'd get this from authentication
    const user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      skillsOffered: user.skillsOffered || [],
      skillsWanted: user.skillsWanted || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update skills for a user (for marketplace)
router.put('/skills/:userId', async (req, res) => {
  try {
    const { skillsOffered, skillsWanted } = req.body;
    
    // For now, we'll use a test user. In a real app, you'd get this from authentication
    const user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.skillsOffered = skillsOffered || [];
    user.skillsWanted = skillsWanted || [];
    
    await user.save();
    res.status(200).json({ message: 'Skills updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users for marketplace
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email skillsOffered skillsWanted bio profilePic');
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
