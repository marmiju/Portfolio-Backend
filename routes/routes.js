const express = require('express');
const { postSkill, getData, deleteSkills, updateskills } = require('../controllers/SkillsController');
const { postExperience, getExperience, deleteExperience, updateExperience } = require('../controllers/ExperienceController');
const { getProfile, updatprofile } = require('../controllers/ProfileController');
const { createBlogs, getBlogs, deleteBlogs, updateBlog } = require('../controllers/BlogsController')


const router = express.Router();

//profile
router.get('/profile', getProfile)
router.put('/profile', updatprofile)

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

//========
router.post('/blogs', createBlogs)
router.get('/blogs', getBlogs)
router.delete('/blogs', deleteBlogs)
router.put('/blogs', updateBlog)

//module
module.exports = router;
