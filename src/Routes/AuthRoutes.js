const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/AuthController');
const Model = require('../Models/User');
const Validate = require('../Middlewares/Validate');

router.post('/login',Validate(Model.loginRules),Controller.login);
router.post('/register',Validate(Model.registerRules),Controller.register);
router.post('/forgot',Validate(Model.forgotRules),Controller.forgot);
module.exports = router;