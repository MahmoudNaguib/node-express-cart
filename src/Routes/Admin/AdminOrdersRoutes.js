require('dotenv').config();
const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Admin/AdminOrdersController');
const Model = require('../../Models/Order');
const Validate = require('../../Middlewares/Validate');


router.get('/', Controller.index);
router.get('/:id', Controller.show);
router.patch('/update-status/:id', Validate(Model.updateStatusRules),Controller.updateStatus);
router.delete('/:id', Controller.delete);
module.exports = router;