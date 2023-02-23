var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../models/User');
require('dotenv').config();

exports.login = async (req, res) => {
    var {
        email,
        password
    } = req.body;

    try {
        var user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(401).json({ message: "Email is not registered with us. Please do register" })
        }
        var isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        var token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Failed to authenticate the user" });
    }
};
