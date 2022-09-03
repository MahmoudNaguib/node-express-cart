const express = require('express');
const router = express.Router();
const Controller = require('../../../Controllers/Logged/FavoritesController');
const Model = require('../../../Models/Favorite');
const Validate = require('../../../Middlewares/Validate');

router.get('/pairs', Controller.pairs);
router.get('/',Controller.index);
router.get('/:id', Controller.show);
router.post('/',Validate(Model.createRules),Controller.store);
router.delete('/:id', Controller.delete);


module.exports = router;