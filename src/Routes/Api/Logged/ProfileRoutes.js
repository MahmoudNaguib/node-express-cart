const express = require('express');
const router = express.Router();
const Controller = require('../../../Controllers/Api/Logged/ProfileController');
const Model = require('../../../Models/User');
const Validate = require('../../../Middlewares/Validate');
const ValidateImageAndResize = require("../../../Middlewares/ValidateImageAndResize");

router.get('/',Controller.index);
router.put('/edit',Validate(Model.editRules),Controller.edit);
router.put('/change-password',Validate(Model.changePasswordRules),Controller.changePassword);
router.put('/change-image',ValidateImageAndResize('image',true,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.changeImage);

module.exports = router;