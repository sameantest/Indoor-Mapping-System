var mongoose = require('mongoose');


var MapSchema = new mongoose.Schema({
    floor: String,
    coordinates: [{
        image: String,
        latitute: Number,
        langitutte: Number,
        name: String,
        edge: [{
            to: String,
            distance: Number
        }]
    }],
    createdAt: {
        type: Date,
        defualt: Date.now()
    }
});

module.exports = new mongoose.model('Map', MapSchema);