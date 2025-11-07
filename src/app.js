const express = require('express');
const aboutRoutes = require('./routes/about');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', aboutRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'About Me API is running!',
    endpoints: {
      about: '/api/about',
      skills: '/api/skills',
      projects: '/api/projects'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});