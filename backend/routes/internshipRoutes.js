const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

// Define routes
router.post('/', internshipController.createInternship);
router.get('/', internshipController.getInternships);

module.exports = router;
