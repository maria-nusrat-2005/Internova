const express = require('express');
const {
  getMyProfile,
  createOrUpdateProfile,
  getProfileByUserId,
} = require('../controllers/profile.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', protect, getMyProfile);
router.put('/', protect, createOrUpdateProfile);
router.get('/:userId', getProfileByUserId);

module.exports = router;
