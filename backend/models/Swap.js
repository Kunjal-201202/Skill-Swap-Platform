const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedSkill: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true
    },
    description: String
  },
  offeredSkill: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true
    },
    description: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot be more than 1000 characters'],
    required: true
  },
  proposedDate: {
    type: Date
  },
  proposedLocation: {
    type: String,
    maxlength: [200, 'Location cannot be more than 200 characters']
  },
  scheduledDate: {
    type: Date
  },
  scheduledLocation: {
    type: String,
    maxlength: [200, 'Location cannot be more than 200 characters']
  },
  duration: {
    type: Number, // in minutes
    default: 60
  },
  requesterRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: Date
  },
  recipientRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: Date
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, 'Message cannot be more than 1000 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot be more than 500 characters']
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for efficient queries
swapSchema.index({ requester: 1, status: 1 });
swapSchema.index({ recipient: 1, status: 1 });
swapSchema.index({ status: 1, createdAt: -1 });

// Virtual for checking if swap can be rated
swapSchema.virtual('canBeRated').get(function() {
  return this.status === 'completed' && this.isCompleted;
});

// Virtual for checking if user can rate
swapSchema.methods.canUserRate = function(userId) {
  if (!this.canBeRated) return false;
  
  if (this.requester.toString() === userId.toString()) {
    return !this.requesterRating.rating;
  }
  
  if (this.recipient.toString() === userId.toString()) {
    return !this.recipientRating.rating;
  }
  
  return false;
};

// Method to add rating
swapSchema.methods.addRating = function(userId, rating, comment) {
  if (this.requester.toString() === userId.toString()) {
    this.requesterRating = {
      rating,
      comment,
      createdAt: new Date()
    };
  } else if (this.recipient.toString() === userId.toString()) {
    this.recipientRating = {
      rating,
      comment,
      createdAt: new Date()
    };
  }
  
  return this.save();
};

// Method to add message
swapSchema.methods.addMessage = function(userId, message) {
  this.messages.push({
    sender: userId,
    message
  });
  
  return this.save();
};

// Method to update status
swapSchema.methods.updateStatus = function(status, userId = null, reason = null) {
  this.status = status;
  
  if (status === 'cancelled') {
    this.cancelledBy = userId;
    this.cancellationReason = reason;
  } else if (status === 'completed') {
    this.isCompleted = true;
    this.completedAt = new Date();
  }
  
  return this.save();
};

// Ensure virtual fields are serialized
swapSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Swap', swapSchema); 