// ──────────────────────────────────────────
// Internship Controller — Sumaiya's task
// ──────────────────────────────────────────

import Internship from "../models/Internship.js";
import { isValidObjectId } from "../utils/validators.js";

// POST /api/internships  — company only
export const createInternship = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ success: false, message: "Only companies can post internships." });
    }

    const { title, description, location, type, requiredSkills, stipend, duration, deadline } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required." });
    }

    const internship = await Internship.create({
      title, description, location, type,
      requiredSkills, stipend, duration, deadline,
      company: req.user._id,
    });

    res.status(201).json({ success: true, message: "Internship created.", data: { internship } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/internships  — public
export const getInternships = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.location) filter.location = new RegExp(req.query.location, "i");
    if (req.query.type) filter.type = req.query.type;

    const internships = await Internship.find(filter)
      .populate("company", "name email")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ success: true, data: { internships } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/internships/my  — company only
export const getMyInternships = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ success: false, message: "Only companies can access this." });
    }

    const internships = await Internship.find({ company: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { internships } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/internships/:id  — public
export const getInternshipById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid internship ID." });
    }

    const internship = await Internship.findById(req.params.id).populate("company", "name email");

    if (!internship) {
      return res.status(404).json({ success: false, message: "Internship not found." });
    }

    res.status(200).json({ success: true, data: { internship } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/internships/:id  — owner only
export const deleteInternship = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid internship ID." });
    }

    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: "Internship not found." });
    }

    if (internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this internship." });
    }

    await internship.deleteOne();
    res.status(200).json({ success: true, message: "Internship deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};