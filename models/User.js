const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing passwords

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralLink: {
    type: String,
    unique: true,
  },
  referredBy: {
    type: String,
    default: null,  // The referral link of the person who referred this user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create referral link method
userSchema.methods.generateReferralLink = function () {
  return `${process.env.BASE_URL}/register?ref=${this._id}`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
