var mongoose = require('mongoose');
var bcrypt = require('bcrypt')


var AdminRegSchema = new mongoose.Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

AdminRegSchema.pre('save', async function (next) {
    var admin = this;
    if(!admin.isModified('password')) {
        return next();
    }
    var hash = await bcrypt.hash(admin.password, 10);
    admin.password = hash;
    next();
});

module.exports = mongoose.model('Admin', AdminRegSchema);