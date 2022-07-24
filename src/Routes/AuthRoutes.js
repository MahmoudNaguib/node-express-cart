const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/AuthController');
const Model = require('../Models/User');
const validate = require('../Middlewares/validate');

router.post('/login',validate(Model.loginRules),Controller.login);
router.post('/register',validate(Model.registerRules),Controller.register);
router.post('/forgot',validate(Model.forgotRules),Controller.forgot);
module.exports = router;