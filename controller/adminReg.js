var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Admin = require('../models/AdminReg');
require('dotenv').config();

exports.register = async (req, res) => {
    var {
        f_name,
        l_name,
        email,
        phone_number,
        password
    } = req.body;

    try {
        let admin = await Admin.create({
            f_name,
            l_name,
            email,
            phone_number,
            password
        });
        res.json(admin)
    } catch (error) {
        res.status(400).json({ message: 'Error registering admin' });
    }
};

