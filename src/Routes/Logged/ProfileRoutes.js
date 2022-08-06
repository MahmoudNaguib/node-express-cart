const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Logged/ProfileController');
const Model = require('../../Models/User');
const Validate = require('../../Middlewares/Validate');
const ValidateImageAndResize = require("../../Middlewares/ValidateImageAndResize");

router.get('/',Controller.index);
router.post('/edit',Validate(Model.editRules),Controller.edit);
router.post('/change-password',Validate(Model.changePasswordRules),Controller.changePassword);
router.post('/change-image',ValidateImageAndResize('image',true,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.changeImage);

module.exports = router;