const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticate = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  const tokenValue = token.split(' ')[1]; // Extract token value if using 'Bearer TOKEN'

  jwt.verify(tokenValue, process.env.JWT_SECRET || 'arwa', (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    req.userRole = decoded.role; // Ensure 'role' is included in the token payload
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  try {
    // Log userId for debugging
    console.log('User ID from token:', req.userId);

    const user = await User.findByPk(req.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden' });
    }
  } catch (error) {
    console.error('Error verifying admin role:', error);
    res.status(500).json({ message: 'Error verifying admin role' });
  }
};
