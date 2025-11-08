const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../../data/aboutData.json');

// Helper function to read data
const readData = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Return default data if file doesn't exist
    return {
      summary: "Full-stack developer passionate about creating efficient web applications",
      languages: ["JavaScript", "Python", "Java"],
      frameworks: ["Node.js", "Express", "React", "Vue.js"],
      certifications: [
        "AWS Certified Developer",
        "Google Cloud Associate"
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
          responsibilities: ["API Development", "System Architecture"]
        }
      ],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution",
          technologies: ["Node.js", "React", "MongoDB"]
        }
      ]
    };
  }
};

// Helper function to write data
const writeData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

// GET /about
exports.getAbout = async (req, res) => {
  try {
    const aboutData = await readData();
    res.json({
      success: true,
      data: aboutData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading profile data',
      error: error.message
    });
  }
};

// POST /about
exports.updateAbout = async (req, res) => {
  try {
    const updates = req.body;
    const currentData = await readData();
    
    // Merge updates with current data
    const updatedData = { ...currentData, ...updates };
    
    await writeData(updatedData);
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile data',
      error: error.message
    });
  }
};