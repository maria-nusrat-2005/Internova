// ──────────────────────────────────────────
// Application Controller
// ──────────────────────────────────────────

import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import { isValidObjectId } from "../utils/validators.js";

// POST /api/applications  — student applies
export const applyToInternship = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ success: false, message: "Only students can apply." });
    }

    const { internshipId, coverLetter } = req.body;

    if (!internshipId) {
      return res.status(400).json({ success: false, message: "internshipId is required." });
    }

    const existing = await Application.findOne({
      student: req.user._id,
      internship: internshipId,
    });

    if (existing) {
      return res.status(409).json({ success: false, message: "You already applied to this internship." });
    }

    const application = await Application.create({
      student: req.user._id,
      internship: internshipId,
      coverLetter,
    });

    // Increment applicantsCount
    await Internship.findByIdAndUpdate(internshipId, { $inc: { applicantsCount: 1 } });

    res.status(201).json({ success: true, message: "Application submitted.", data: { application } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/applications/my  — student
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate("internship", "title company location type stipend")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: { applications } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/applications/internship/:id  — company
export const getApplicantsByInternship = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const applications = await Application.find({ internship: req.params.id })
      .populate("student", "name email");

    res.status(200).json({ success: true, data: { applications } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/applications/:id  — company updates status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["applied", "reviewed", "interview", "accepted", "rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Status updated.", data: { application } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};