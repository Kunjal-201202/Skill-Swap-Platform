const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  bio: String,
  contact: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,
  portfolioLink: String,
  skillVerificationStatus: { type: String, default: 'Pending' },
  profilePic: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
