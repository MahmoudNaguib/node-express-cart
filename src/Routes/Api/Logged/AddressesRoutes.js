const express = require('express');
const router = express.Router();
const Controller = require('../../../Controllers/Logged/AddressesController');
const Model = require('../../../Models/Address');
const Validate = require('../../../Middlewares/Validate');

router.get('/pairs', Controller.pairs);
router.get('/',Controller.index);
router.get('/:id', Controller.show);
router.post('/',Validate(Model.createRules),Controller.store);
router.put('/:id', Validate(Model.editRules),Controller.update);
router.delete('/:id', Controller.delete);
module.exports = router;