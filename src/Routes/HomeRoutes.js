require('dotenv').config();
const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/HomeController');

router.get('/', Controller.index);
module.exports = router;