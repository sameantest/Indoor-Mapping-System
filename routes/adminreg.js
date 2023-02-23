
var express = require('express');
var router = express.Router();
var adminControl = require('../controller/adminReg');
var Admin = require('../models/AdminReg');


router.get('/', async (req, res) => {
    Admin.find()
            .then(admin => res.json(admin))
            .catch(err => res.status(404).json({ noadminfound: "No admins found" }));
})
router.post('/', adminControl.register);


module.exports = router;