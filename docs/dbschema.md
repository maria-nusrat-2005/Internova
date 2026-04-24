Good — now we lock the final, production-grade data models for your entire app.
This version is:
✅ Clean (for 2-day build)
✅ Scalable (future AI/matching)
✅ Viva-ready (you can explain confidently)

🧠 OVERVIEW (ALL COLLECTIONS)
1. User          → authentication + roles
2. Profile       → detailed user info
3. Internship    → job posts
4. Application   → student applies to internship


🧩 1. USER MODEL (AUTH CORE)
// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔥 important
    },

    role: {
      type: String,
      enum: ["student", "company"],
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);


🧩 2. PROFILE MODEL (SMART DESIGN)
👉 Single schema supports BOTH student + company
// models/Profile.js

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    avatar: String,

    // 🔹 STUDENT FIELDS
    skills: [
      {
        name: String,
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
          default: "beginner",
        },
      },
    ],

    interests: [String],

    education: {
      university: String,
      degree: String,
      year: Number,
    },

    github: String,
    linkedin: String,

    // 🔹 COMPANY FIELDS
    companyInfo: {
      companyName: String,
      website: String,
      industry: String,
      size: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);


🧩 3. INTERNSHIP MODEL (CORE PRODUCT)
// models/Internship.js

import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: String,
      default: "Remote",
    },

    type: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "onsite",
    },

    requiredSkills: [String],

    stipend: {
      type: Number,
      default: 0,
    },

    duration: {
      type: String, // e.g. "3 months"
    },

    deadline: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    applicantsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Internship", internshipSchema);


🧩 4. APPLICATION MODEL (HIGH IMPACT)
👉 This makes your system feel real
// models/Application.js

import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },

    status: {
      type: String,
      enum: ["applied", "reviewed", "interview", "accepted", "rejected"],
      default: "applied",
    },

    matchScore: {
      type: Number,
      default: 0, // can fake for demo 😄
    },

    coverLetter: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 Prevent duplicate applications
applicationSchema.index({ student: 1, internship: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);


🔗 RELATIONSHIP SUMMARY
User (1) ─── (1) Profile

User (company) ─── (many) Internships

User (student) ─── (many) Applications

Internship ─── (many) Applications


⚡ IMPORTANT DESIGN DECISIONS (SAY THIS IN VIVA)
✅ Why separate Profile from User?
“To maintain scalability and separation of concerns. Authentication and user data are decoupled.”

✅ Why Application model?
“To track interactions between students and internships, enabling future analytics and matching.”

✅ Why not embed everything?
“We used references to maintain normalization and avoid data duplication.”

🔥 OPTIONAL (BUT IMPRESSIVE)
Add virtual field in Internship:
internshipSchema.virtual("applications", {
  ref: "Application",
  localField: "_id",
  foreignField: "internship",
});

Say:
“We used virtual population for relational querying.”
😄 Instant +marks.

⚠️ FINAL WARNING
Don’t:
Add unnecessary fields
Overcomplicate relations
Try to build AI now
Do:
👉 Keep models clean
👉 Make APIs work
👉 Show working demo

✅ NEXT STEP
If you want, I’ll give you:
🔹 Full controller logic (all modules)
🔹 Postman testing collection
🔹 Frontend API integration (React + Axios)
Just tell me 👍

