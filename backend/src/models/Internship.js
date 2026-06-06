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
      type: String,
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

// Virtual for applications (relational querying)
internshipSchema.virtual("applications", {
  ref: "Application",
  localField: "_id",
  foreignField: "internship",
});

export default mongoose.model("Internship", internshipSchema);