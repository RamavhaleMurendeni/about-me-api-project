// In-memory storage (in production, use a database)
let profileData = {
  summary: "Full-stack developer passionate about creating efficient and scalable web applications. Experienced in JavaScript, Node.js, React, and cloud technologies.",
  languages: ["JavaScript", "Python", "Java", "SQL"],
  frameworks: ["Node.js", "Express", "React", "Next.js", "Django"],
  certifications: [
    "AWS Certified Developer Associate",
    "Google Cloud Associate Engineer"
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
      position: "Backend Developer",
      company: "Tech Solutions Inc.",
      duration: "2021-Present",
      responsibilities: [
        "Developed RESTful APIs",
        "Implemented database solutions",
        "Deployed applications to cloud platforms"
      ]
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
    }
  ]
};

const getAbout = (req, res) => {
  try {
    res.json({
      success: true,
      data: profileData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile data",
      error: error.message
    });
  }
};

const updateAbout = (req, res) => {
  try {
    const updates = req.body;
    
    // Validate required fields
    const requiredFields = ['summary', 'languages', 'frameworks', 'certifications', 'education', 'experience', 'projects'];
    for (let field of requiredFields) {
      if (!updates[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`
        });
      }
    }

    // Update profile data
    profileData = { ...profileData, ...updates, lastUpdated: new Date().toISOString() };

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: profileData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile data",
      error: error.message
    });
  }
};

module.exports = {
  getAbout,
  updateAbout
};