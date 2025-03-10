const express = require('express');
const { postSkill, getData } = require('../controllers/SkillsController');

const router = express.Router();

router.post('/users', postSkill);
router.get('/users', getData)
module.exports = router;
