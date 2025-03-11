const express = require('express');
const { postSkill, getData, deleteSkills, updateskills } = require('../controllers/SkillsController');
const { postExperience, getExperience, deleteExperience, updateExperience } = require('../controllers/ExperienceController');


const router = express.Router();

//Skills
router.post('/skills', postSkill);
router.get('/skills', getData)
router.delete('/skills', deleteSkills)
router.put('/skills', updateskills)

//Experience
router.post('/experience', postExperience);
router.get('/experience', getExperience)
router.delete('/experience', deleteExperience)
router.put('/experience', updateExperience)
module.exports = router;
