const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is defined

// POST route for registering a new user
router.post('/register', async (req, res) => {
    const { name, email, password, referralCode } = req.body;
    
    // Validate and create the user (this is an example, adjust as needed)
    try {
        const user = new User({ name, email, password, referralCode });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
