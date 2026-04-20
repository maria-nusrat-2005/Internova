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

const { MongoMemoryServer } = require('mongodb-memory-server');

const startServer = async () => {
  try {
    console.log('Booting up temporary database... (This may take a moment if it is downloading binaries)');
    // Always use in-memory database to guarantee it works without local setup
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    console.log('Connected to In-Memory MongoDB successfully!');
    
    // Routes
    app.use('/api/auth', authRoutes);

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
