const mongoose = require('mongoose');

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
      ref: 'User',
      required: true,
    },

    location: {
      type: String,
      default: 'Remote',
    },

    type: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      default: 'onsite',
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

// Virtual population for applications
internshipSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'internship',
});

module.exports = mongoose.model('Internship', internshipSchema);
