const express = require('express');
const { postSkill, getdata } = require('../controllers/UserControllers');

const router = express.Router();

router.post('/users', postSkill);
// router.get('/users', getdata)
module.exports = router;
