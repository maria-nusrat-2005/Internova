import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import internshipRoutes from "./routes/internship.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// ── Middleware ──────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "🚀 Internova API is running!" });
});

// ── Routes ──────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);

// ── 404 handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Error handler ────────────────────────────
app.use(errorHandler);

export default app;