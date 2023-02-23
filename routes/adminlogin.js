
let express = require('express');
let router = express.Router();
let adminlogin = require('../controller/adminLogin');

router.post('/', adminlogin.login);

module.exports = router;