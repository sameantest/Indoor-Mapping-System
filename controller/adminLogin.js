
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let Admin = require('../models/AdminReg');
require('dotenv').config();

exports.login = async (req, res) => {
    let {
        email,
        password
    } = req.body;

    try {
        let admin = await Admin.findOne({
            email
        });
        if (!admin) {
            return res.status(401).json({ message: 'Email not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        let token = jwt.sign({
            id: admin._id
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        return res.status(400).json({ message: 'Error authenticating admin' });
    }
};