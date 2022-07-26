const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Api/ProductsController');

router.get('/', Controller.index);
router.get('/:id', Controller.show);
module.exports = router;