const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    avatar: String,

    // Student fields
    skills: [
      {
        name: String,
        level: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced'],
          default: 'beginner',
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

    // Company fields
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

module.exports = mongoose.model('Profile', profileSchema);
