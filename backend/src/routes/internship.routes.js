const express = require('express');
const {
  createInternship,
  getInternships,
  getInternshipById,
  deleteInternship,
  getMyInternships,
} = require('../controllers/internship.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getInternships);

// Private routes (must be before /:id to avoid conflict)
router.get('/my', protect, authorize('company'), getMyInternships);
router.post('/', protect, authorize('company'), createInternship);

// Parameterized routes
router.get('/:id', getInternshipById);
router.delete('/:id', protect, authorize('company'), deleteInternship);

module.exports = router;
