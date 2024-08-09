const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
require('dotenv').config();  // Load environment variables

// Sign Up
exports.signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    
    // Validate input
    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create new user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: 'user',
    });

    res.status(201).json({
      id: user.id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Log In
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Validate input
    if (!userName || !password) {
      return res.status(400).json({ message: 'userName and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { userName } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' });

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'arwa', // Use environment variable
      { expiresIn: '1h' }
    );

    res.json({ auth: true, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};