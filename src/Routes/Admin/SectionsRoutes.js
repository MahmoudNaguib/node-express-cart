require('dotenv').config();
const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Admin/AdminSectionsController');
const Model = require('../../Models/Section');
const ValidateImageAndResize = require('../../Middlewares/ValidateImageAndResize');
const Validate = require('../../Middlewares/Validate');

/******Allow attachment*******/
const multer = require('multer');
const upload = multer();
router.use(upload.fields([{name:'image',maxCount: 1}]));
/******Allow attachment*******/


router.get('/pairs', Controller.pairs);
router.get('/', Controller.index);
router.get('/:id', Controller.show);
router.post('/',Validate(Model.createRules),ValidateImageAndResize('image',true,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.store);
router.put('/:id', Validate(Model.editRules),ValidateImageAndResize('image',false,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.update);
router.delete('/:id', Controller.delete);
module.exports = router;