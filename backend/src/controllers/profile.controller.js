const Profile = require('../models/Profile');

// @desc    Get my profile
// @route   GET /api/profile
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      'name email role'
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create or update profile
// @route   PUT /api/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const {
      bio,
      avatar,
      skills,
      interests,
      education,
      github,
      linkedin,
      companyInfo,
    } = req.body;

    // Build profile fields object
    const profileFields = { user: req.user.id };

    if (bio !== undefined) profileFields.bio = bio;
    if (avatar !== undefined) profileFields.avatar = avatar;
    if (skills !== undefined) profileFields.skills = skills;
    if (interests !== undefined) profileFields.interests = interests;
    if (education !== undefined) profileFields.education = education;
    if (github !== undefined) profileFields.github = github;
    if (linkedin !== undefined) profileFields.linkedin = linkedin;
    if (companyInfo !== undefined) profileFields.companyInfo = companyInfo;

    // Upsert: update if exists, create if not
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, runValidators: true }
    ).populate('user', 'name email role');

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profile/:userId
// @access  Public
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', 'name email role');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
