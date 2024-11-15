const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');  // Import the middleware

// Protected route that requires authentication
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'Welcome to the dashboard!',
    user: req.user,  // The user info is now available from the decoded JWT
  });
});

module.exports = router;
