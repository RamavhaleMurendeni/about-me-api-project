const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Sample profile data
let profileData = {
  summary: "Full-stack developer with 3+ years of experience building scalable web applications. Passionate about clean code and user-centric design.",
  languages: ["JavaScript", "Python", "TypeScript", "Java"],
  frameworks: ["Node.js", "Express", "React", "Vue.js", "Django"],
  certifications: [
    "AWS Certified Developer Associate",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer"
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      university: "Tech University",
      year: 2020
    }
  ],
  experience: [
    {
      position: "Senior Developer",
      company: "Tech Corp",
      duration: "2021-Present",
      responsibilities: [
        "Led development of microservices architecture",
        "Mentored junior developers",
        "Improved application performance by 40%"
      ]
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    }
  ],
  lastUpdated: new Date().toISOString()
};

// GET /about - Retrieve profile information
app.get('/about', (req, res) => {
  res.json({
    success: true,
    data: profileData,
    message: "Profile data retrieved successfully"
  });
});

// POST /about - Update profile information
app.post('/about', (req, res) => {
  try {
    const updates = req.body;
    
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No data provided for update"
      });
    }

    // Update profile data
    profileData = {
      ...profileData,
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: profileData,
      message: "Profile updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update profile",
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'About Me API is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'About Me API - Ramavhale Murendeni',
    endpoints: {
      'GET /about': 'Get profile information',
      'POST /about': 'Update profile information',
      'GET /health': 'API health check'
    },
    deployed: true,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    availableEndpoints: ['GET /about', 'POST /about', 'GET /health', 'GET /']
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});