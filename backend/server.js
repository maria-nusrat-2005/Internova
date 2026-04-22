const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Author: Maria Nusrat
// ID: 241061004
// Group: A
// Project Title: Smart Internship Matching System

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/internship_matching';
    
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB successfully at ${mongoUri}`);
    
    const internshipRoutes = require('./routes/internshipRoutes');

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/internships', internshipRoutes);

    app.get('/', (req, res) => {
      res.send('Smart Internship Matching System API is running...');
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
