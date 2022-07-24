require('dotenv').config();
const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Admin/SectionsController');
const Model = require('../../Models/Section');
const validateImageAndResize = require('../../Middlewares/validateImageAndResize');
const validate = require('../../Middlewares/validate');


router.get('/pairs', Controller.pairs);
router.get('/', Controller.index);
router.get('/:id', Controller.show);
router.post('/',validate(Model.createRules),validateImageAndResize('image',false,process.env.MAX_IMG_SIZE,{large: '400x300', small: '200x150'}),Controller.store);
router.put('/:id', validate(Model.editRules),Controller.update);
router.delete('/:id', Controller.delete);
module.exports = router;