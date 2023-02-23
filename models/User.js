let mongoose = require('mongoose');
let bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema({
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
        required: true,
        type: String
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
    UpdatedAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', async function(next) {
    var user = this;
    if(!user.isModified('password')) {
        return next();
    }

    let hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

module.exports = mongoose.model('User', UserSchema);
