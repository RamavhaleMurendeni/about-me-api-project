const express = require('express');
const { getAbout, updateAbout } = require('../controllers/aboutController');

const router = express.Router();

// GET /about - Get profile information
router.get('/', getAbout);

// POST /about - Update profile information
router.post('/', updateAbout);

module.exports = router;