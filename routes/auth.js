const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
  const { name, email, password, referralCode } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if referral code is valid and get the referrer
    let referredBy = null;
    if (referralCode) {
      referredBy = await User.findOne({ referralCode });
      if (!referredBy) {
        return res.status(400).json({ message: "Invalid referral code" });
      }
    }

    // Create the user
    const user = new User({
      name,
      email,
      password,
      referralCode: generateReferralCode(),
      referredBy: referredBy ? referredBy._id : null,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Helper function to generate a referral code (simple example)
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

module.exports = router;
