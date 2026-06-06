import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("");
    console.log("🚀  INTERNOVA BACKEND RUNNING");
    console.log("================================");
    console.log(`📍  URL:  http://localhost:${PORT}`);
    console.log(`🗄️   DB:   MongoDB connected`);
    console.log("================================");
    console.log("");
    console.log("Available routes:");
    console.log("  POST  /api/auth/register");
    console.log("  POST  /api/auth/login");
    console.log("  GET   /api/auth/me");
    console.log("  GET   /api/profile");
    console.log("  PUT   /api/profile");
    console.log("  POST  /api/internships");
    console.log("  GET   /api/internships");
    console.log("  POST  /api/applications");
    console.log("");
  });
};

start();