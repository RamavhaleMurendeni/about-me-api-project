const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/profile.json');

// Helper function to read data
async function readData() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}

// Helper function to write data
async function writeData(data) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

// GET /about - Get complete profile
router.get('/', async (req, res) => {
  try {
    const data = await readData();
    if (!data) {
      return res.status(500).json({ error: 'Unable to read profile data' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /about/profile - Get basic profile info
router.get('/profile', async (req, res) => {
  try {
    const data = await readData();
    if (!data) {
      return res.status(500).json({ error: 'Unable to read profile data' });
    }
    res.json(data.profile);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /about/experience - Get work experience
router.get('/experience', async (req, res) => {
  try {
    const data = await readData();
    if (!data) {
      return res.status(500).json({ error: 'Unable to read profile data' });
    }
    res.json(data.experience);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /about/education - Get education history
router.get('/education', async (req, res) => {
  try {
    const data = await readData();
    if (!data) {
      return res.status(500).json({ error: 'Unable to read profile data' });
    }
    res.json(data.education);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /about/skills - Get all skills
router.get('/skills', async (req, res) => {
  try {
    const data = await readData();
    if (!data) {
      return res.status(500).json({ error: 'Unable to read profile data' });
    }
    res.json({
      technical: data.technicalSkills,
      soft: data.softSkills
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /about/certifications - Get certifications
router.get('/certifications', async (req, res) => {
  try {
    const data = await readData();
    if (!data) {
      return res.status(500).json({ error: 'Unable to read profile data' });
    }
    res.json(data.certifications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /about - Update profile information
router.post('/', async (req, res) => {
  try {
    const updateData = req.body;
    const currentData = await readData();
    
    if (!currentData) {
      return res.status(500).json({ error: 'Unable to read current data' });
    }

    // Merge updates with current data
    const updatedData = {
      ...currentData,
      ...updateData,
      profile: {
        ...currentData.profile,
        ...updateData.profile
      }
    };

    const success = await writeData(updatedData);
    if (!success) {
      return res.status(500).json({ error: 'Unable to update profile data' });
    }

    res.json({ 
      message: 'Profile updated successfully',
      data: updatedData
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;