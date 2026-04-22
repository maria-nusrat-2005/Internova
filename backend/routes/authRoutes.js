const express = require('express');
const { register, login, getMe, updateProfile, deleteAccount } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteAccount);

// Example of a role-protected route (just to demonstrate how it works)
router.get('/admin-only', protect, authorize('admin'), (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome Admin!' });
});

router.get('/company-only', protect, authorize('company', 'admin'), (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome Company Representative!' });
});

module.exports = router;
