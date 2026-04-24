const Internship = require('../models/Internship');

// @desc    Create internship
// @route   POST /api/internships
// @access  Private (company only)
exports.createInternship = async (req, res) => {
  try {
    const { title, description, location, type, requiredSkills, stipend, duration, deadline } =
      req.body;

    const internship = await Internship.create({
      title,
      description,
      company: req.user.id, // Logged-in company user
      location,
      type,
      requiredSkills,
      stipend,
      duration,
      deadline,
    });

    res.status(201).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all internships (with optional filters)
// @route   GET /api/internships?location=X&type=Y
// @access  Public
exports.getInternships = async (req, res) => {
  try {
    const query = { isActive: true };

    // Optional query filters
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.type) {
      query.type = req.query.type;
    }

    const internships = await Internship.find(query)
      .populate('company', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single internship by ID
// @route   GET /api/internships/:id
// @access  Public
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate(
      'company',
      'name email'
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete internship
// @route   DELETE /api/internships/:id
// @access  Private (owner company only)
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    // Ensure only the company that created it can delete
    if (internship.company.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this internship',
      });
    }

    await Internship.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Internship deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get my internships (posted by logged-in company)
// @route   GET /api/internships/my
// @access  Private (company only)
exports.getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ company: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
