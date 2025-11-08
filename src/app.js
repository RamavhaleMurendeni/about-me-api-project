const express = require('express');
const cors = require('cors');
require('dotenv').config();

const aboutRoutes = require('./routes/aboutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/about', aboutRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'About Me API is running!',
    endpoints: {
      'GET /about': 'Get profile information',
      'POST /about': 'Update profile information'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});