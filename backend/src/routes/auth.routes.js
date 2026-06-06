import express from "express";
import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/auth/register  — public
router.post("/register", register);

// POST /api/auth/login  — public
router.post("/login", login);

// GET /api/auth/me  — protected
router.get("/me", protect, getMe);

// POST /api/auth/logout  — protected
router.post("/logout", protect, logout);

export default router;