const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Remote', 'On-site', 'Hybrid'],
    default: 'On-site',
  },
  status: {
    type: String,
    enum: ['Active', 'Reviewing', 'Closed'],
    default: 'Active',
  },
  applicantsCount: {
    type: Number,
    default: 0,
  },
  matchesCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Internship', internshipSchema);
