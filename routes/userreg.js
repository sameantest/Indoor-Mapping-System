
let express = require('express');
let router = express.Router();
let userReg = require('../controller/userReg');

router.post('/', userReg.register);
router.get('/:_id', userReg.findOneUser);
router.get('/', userReg.getAlluser);
router.put('/', userReg.update);

module.exports = router;