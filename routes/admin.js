const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.use(authenticate); // All routes require authentication
router.get('/', isAdmin, adminController.getAdmins); // Only admins can access this route
router.post('/', isAdmin, adminController.addAdmin); // Only admins can access this route
router.delete('/:id', isAdmin, adminController.deleteAdmin); // Only admins can access this route
router.put('/:id', isAdmin, adminController.updateAdmin);

router.get('/users', isAdmin, adminController.getUsers); // View Users
router.delete('/users/:id', isAdmin, adminController.deleteUser); // Delete User

module.exports = router;
