const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Logged/CartController');
const Model = require('../../Models/Cart');
const Validate = require('../../Middlewares/Validate');

router.get('/',Controller.index);
router.post('/',Validate(Model.createRules),Controller.store);

module.exports = router;