const Internship = require('../models/Internship');

// Create a new internship posting
exports.createInternship = async (req, res) => {
  try {
    const { title, company, description, location, type } = req.body;

    const newInternship = new Internship({
      title,
      company,
      description,
      location,
      type
    });

    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all internship postings
exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json(internships);
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
