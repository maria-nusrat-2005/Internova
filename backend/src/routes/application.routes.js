import express from "express";
import {
  applyToInternship,
  getMyApplications,
  getApplicantsByInternship,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, applyToInternship);
router.get("/my", protect, getMyApplications);
router.get("/internship/:id", protect, getApplicantsByInternship);
router.put("/:id", protect, updateApplicationStatus);

export default router;