import express from "express";
import { getMyProfile, updateProfile, getProfileById } from "../controllers/profile.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getMyProfile);
router.put("/", protect, updateProfile);
router.get("/:userId", getProfileById);

export default router;