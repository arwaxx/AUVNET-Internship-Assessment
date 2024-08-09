const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.getAdmins = async (req, res) => {
  try {
    console.log('Fetching admins...'); // Debugging line
    const admins = await User.findAll({ where: { role: 'admin' } });
    console.log('Admins fetched:', admins); // Debugging line
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error); // Debugging line
    res.status(500).json({ message: 'Error fetching admins' });
  }
};


exports.addAdmin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const admin = await User.create({ userName, email, password: hashedPassword, role: 'admin' });
    res.status(201).json(admin);
  } catch (error) {
    console.error('Error adding admin:', error); // Log detailed error
    res.status(500).json({ message: 'Error adding admin', error: error.message });
  }
};


exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findByPk(req.params.id);
    if (!admin || admin.role !== 'admin') return res.status(404).json({ message: 'Admin not found' });
    await admin.destroy();
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin' });
  }
};

// adminController.js
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, password } = req.body;

    // Find the admin to update
    const admin = await User.findByPk(id);

    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update fields
    if (userName) admin.userName = userName;
    if (email) admin.email = email;
    if (password) admin.password = bcrypt.hashSync(password, 8);

    await admin.save();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    console.log('Fetching users...'); // Debugging line
    const users = await User.findAll({ where: { role: 'user' } });
    console.log('Users fetched:', users); // Debugging line
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Debugging line
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user || user.role !== 'user') return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
