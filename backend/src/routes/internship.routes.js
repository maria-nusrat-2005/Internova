import express from "express";
import {
  createInternship,
  getInternships,
  getInternshipById,
  deleteInternship,
  getMyInternships,
} from "../controllers/internship.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createInternship);
router.get("/", getInternships);
router.get("/my", protect, getMyInternships);
router.get("/:id", getInternshipById);
router.delete("/:id", protect, deleteInternship);

export default router;