const jwt = require('jsonwebtoken');  // Import the jsonwebtoken library
const config = require('../config');  // Import your config (where secret key is stored)

// Middleware to authenticate users using JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get the token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied, No Token Provided' });
  }

  // Verify the token
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    // Store decoded user information in the request object for access in subsequent routes
    req.user = decoded;
    next();  // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;  // Export the middleware
