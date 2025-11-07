const express = require('express');
const router = express.Router();

// Sample data based on your CV
let profileData = {
  summary: "Results-oriented IT professional transitioning into a specialised Back-End Developer role. With one year of system development experience at Mindworx, complemented by hands-on roles in security analysis and IT support.",
  
  languages: ["Java", "JavaScript", "Python", "C#", "C++", "HTML/CSS/SCSS/SASS"],
  
  frameworks: [".NET"],
  
  certifications: [
    { name: "CompTIA S+", year: 2023 },
    { name: "AZ-500", year: 2025 },
    { name: "SC-200", year: 2025 }
  ],
  
  education: [
    { institution: "University of Venda", degree: "BSc Business Information Systems (Hons)", period: "2023-2024" },
    { institution: "University of Venda", degree: "BSc Computer Sciences", period: "2016-2021" },
    { institution: "tma.Academy", degree: "Software Engineer Training", period: "Sept 2025" }
  ],
  
  experience: [
    {
      position: "IT Technician",
      company: "OMT(Open Mind Technology)",
      period: "Nov 2024 - Feb 2024",
      responsibilities: [
        "Provided on-site and remote technical support",
        "Trained staff on new technologies",
        "Implemented and maintained IT policies"
      ]
    },
    {
      position: "System Development",
      company: "Mindworx",
      period: "June 2023 - Dec 2024",
      responsibilities: [
        "Database Management and design",
        "Requirements Analysis",
        "Quality Assurance & Testing"
      ]
    }
  ],
  
  projects: [
    {
      name: "About Me API",
      description: "Backend API showcasing professional profile",
      technologies: ["Node.js", "Express", "JavaScript"]
    }
  ],
  
  technicalSkills: ["Databases(SQL)", "Java, JavaScript", "C#, C++ .NET", "HTML/CSS/SCSS/SASS", "Git, GitHub", "Python"],
  
  softSkills: [
    "Ability to synthesize and understand complex content",
    "Problem-solving tools and experience",
    "Advanced research methods/skills",
    "Self-disciplined, Hard worker, Responsible and dependable"
  ]
};

// GET /about - Retrieve profile information
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: profileData,
    timestamp: new Date().toISOString()
  });
});

// POST /about - Update profile information
router.post('/', (req, res) => {
  const updates = req.body;
  
  // Simple validation
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Invalid data provided'
    });
  }
  
  // Update profile data
  Object.keys(updates).forEach(key => {
    if (profileData.hasOwnProperty(key)) {
      profileData[key] = updates[key];
    }
  });
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: profileData,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;