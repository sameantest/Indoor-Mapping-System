var mongoose = require('mongoose');


var MapSchema = new mongoose.Schema({
    floorNumber: {
        type: Number,
        unique: true
    },
    floor_image: String,
   floors: [{
    coordinates: [{
        latitute: Number,
        langitute: Number,
        name: String,
        edge: [{
            to: String,
            distance: Number
        }]
    }],
    shops: [{
        name: String,
        shop_image: String,
        distance: Number,
        from: String,
        to: String
    }]
   }],
    createdAt: {
        type: Date,
        defualt: Date.now()
    }
});

module.exports = new mongoose.model('Map', MapSchema);