const express = require('express');
const {
  applyToInternship,
  getMyApplications,
  getApplicantsForInternship,
  updateApplicationStatus,
} = require('../controllers/application.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, authorize('student'), applyToInternship);
router.get('/my', protect, getMyApplications);
router.get('/internship/:id', protect, authorize('company'), getApplicantsForInternship);
router.put('/:id', protect, authorize('company'), updateApplicationStatus);

module.exports = router;
