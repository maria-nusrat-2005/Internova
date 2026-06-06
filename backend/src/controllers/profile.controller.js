// ──────────────────────────────────────────
// Profile Controller — Member 2's task
// ──────────────────────────────────────────

import Profile from "../models/Profile.js";

// GET /api/profile  — get my profile
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      "name email role"
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found." });
    }

    res.status(200).json({ success: true, data: { profile } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/profile  — create or update my profile
export const updateProfile = async (req, res) => {
  try {
    const { bio, skills, interests, education, github, linkedin, companyInfo, avatar } = req.body;

    const profileData = {
      user: req.user._id,
      bio, skills, interests, education,
      github, linkedin, companyInfo, avatar,
    };

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      profileData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Profile updated.", data: { profile } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/profile/:userId  — public
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate(
      "user", "name email role"
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found." });
    }

    res.status(200).json({ success: true, data: { profile } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};