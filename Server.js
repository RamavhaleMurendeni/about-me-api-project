const express = require('express');
const cors = require('cors');
const aboutRoutes = require('./routes/about');

const app = express();
const PORT = process.env.PORT || 5000; // Changed from 3000 to 5000

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/about', aboutRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'About Me API for Murendeni Ramavhale',
    endpoints: {
      'GET /about': 'Get profile information',
      'POST /about': 'Update profile information',
      'GET /about/experience': 'Get work experience',
      'GET /about/education': 'Get education history',
      'GET /about/skills': 'Get technical skills'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API available at: http://localhost:${PORT}`);
});

module.exports = app;