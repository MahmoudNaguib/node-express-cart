const express = require('express');
const router = express.Router();
const Controller = require('../../../Controllers/Api/Logged/OrdersController');
const Model = require('../../../Models/Order');
const Validate = require('../../../Middlewares/Validate');

router.get('/',Controller.index);
router.get('/:id', Controller.show);
router.post('/',Validate(Model.createRules),Controller.store);

module.exports = router;