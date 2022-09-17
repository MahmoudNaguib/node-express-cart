const express = require('express');
const router = express.Router();
const Controller = require('../../../Controllers/Api/Logged/CartController');
const Model = require('../../../Models/Cart');
const Validate = require('../../../Middlewares/Validate');

router.get('/',Controller.index);
router.get('/:id', Controller.show);
router.post('/',Validate(Model.createRules),Controller.store);
router.put('/:id', Validate(Model.editRules),Controller.update);
router.delete('/:id', Controller.delete);


module.exports = router;