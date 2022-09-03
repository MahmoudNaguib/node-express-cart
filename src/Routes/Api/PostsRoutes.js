const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/PostsController');
const Validate = require("../../Middlewares/Validate");
const CommentModel = require("../../Models/Comment");

router.get('/', Controller.index);
router.get('/:id', Controller.show);

/*******Comments******/
router.get('/:id/comments', Controller.comments);
router.post('/:id/comments',[require('../../Middlewares/IsAuth')],Validate(CommentModel.createRules), Controller.createComment);
/**************/

module.exports = router;