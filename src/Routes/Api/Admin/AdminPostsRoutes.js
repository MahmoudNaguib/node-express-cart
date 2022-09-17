const express = require('express');
const router = express.Router();
const Controller = require('../../../Controllers/Api/Admin/AdminPostsController');
const Model = require('../../../Models/Post');
const Validate = require('../../../Middlewares/Validate');
const ValidateImageAndResize = require("../../../Middlewares/ValidateImageAndResize");


router.get('/', Controller.index);
router.get('/:id', Controller.show);
router.post('/',Validate(Model.createRules),ValidateImageAndResize('image',false,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.store);
router.put('/:id', Validate(Model.editRules),ValidateImageAndResize('image',false,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.update);
router.delete('/:id', Controller.delete);
/*******Comments******/
router.get('/:id/comments', Controller.comments);
router.delete('/:id/comments/:comment_id', Controller.deleteComment);
/**************/
module.exports = router;