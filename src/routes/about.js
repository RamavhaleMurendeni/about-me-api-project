 const express = require('express');
const router = express.Router();

// About me data
const aboutData = {
  name: "Ramavhale Murendeni",
  title: "Software Developer",
  description: "Passionate about building amazing software solutions",
  contact: {
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile"
  }
};

const skills = [
  "JavaScript", "Node.js", "Express.js", "React", "Python", "SQL"
];

const projects = [
  {
    name: "About Me API",
    description: "A RESTful API to share information about myself",
    technologies: ["Node.js", "Express"]
  }
];

// Routes
router.get('/about', (req, res) => {
  res.json(aboutData);
});

router.get('/skills', (req, res) => {
  res.json(skills);
});

router.get('/projects', (req, res) => {
  res.json(projects);
});

module.exports = router;
