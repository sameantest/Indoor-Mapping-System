
var express = require('express');
var router = express.Router();
var userLogin = require('../controller/userLogin');

router.post('/', userLogin.login);

module.exports = router;