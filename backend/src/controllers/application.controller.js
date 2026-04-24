const Application = require('../models/Application');
const Internship = require('../models/Internship');

// @desc    Apply to an internship
// @route   POST /api/applications
// @access  Private (student only)
exports.applyToInternship = async (req, res) => {
  try {
    const { internshipId, coverLetter } = req.body;

    // Check if internship exists and is active
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    if (!internship.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This internship is no longer accepting applications',
      });
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({
      student: req.user.id,
      internship: internshipId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this internship',
      });
    }

    const application = await Application.create({
      student: req.user.id,
      internship: internshipId,
      coverLetter,
    });

    // Increment applicants count on the internship
    await Internship.findByIdAndUpdate(internshipId, {
      $inc: { applicantsCount: 1 },
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get my applications (student)
// @route   GET /api/applications/my
// @access  Private
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id })
      .populate({
        path: 'internship',
        populate: { path: 'company', select: 'name email' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get applicants for an internship (company)
// @route   GET /api/applications/internship/:id
// @access  Private (company only)
exports.getApplicantsForInternship = async (req, res) => {
  try {
    // Verify the internship belongs to this company
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found',
      });
    }

    if (internship.company.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view applicants for this internship',
      });
    }

    const applications = await Application.find({
      internship: req.params.id,
    })
      .populate('student', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (company only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id).populate(
      'internship'
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Verify the internship belongs to this company
    if (application.internship.company.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application',
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
