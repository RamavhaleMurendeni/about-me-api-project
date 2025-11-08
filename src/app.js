const express = require('express');
const cors = require('cors');
const aboutRoutes = require('./routes/aboutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/about', aboutRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'About Me API',
    endpoints: {
      'GET /about': 'Get profile information',
      'POST /about': 'Update profile information'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});