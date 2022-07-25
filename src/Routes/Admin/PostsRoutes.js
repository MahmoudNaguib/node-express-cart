const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Admin/PostsController');
const Model = require('../../Models/Post');
const Validate = require('../../Middlewares/Validate');
const ValidateImageAndResize = require("../../Middlewares/ValidateImageAndResize");

/******Allow attachment*******/
const multer = require('multer');
const upload = multer();
router.use(upload.fields([{name:'image',maxCount: 1}]));
/******Allow attachment*******/

router.get('/', Controller.index);
router.get('/:id', Controller.show);
router.post('/',Validate(Model.createRules),ValidateImageAndResize('image',false,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.store);
router.put('/:id', Validate(Model.editRules),ValidateImageAndResize('image',false,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.update);
router.delete('/:id', Controller.delete);
module.exports = router;