const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/Api/ConfirmController');

router.get('/confirm/:token',Controller.confirm);
module.exports = router;