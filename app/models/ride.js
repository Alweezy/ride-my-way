'use strict';

const mongoose = require('mongoose');


const RideSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: String
});


const ride = module.exports = mongoose.model('ride', RideSchema);


//to return all the rides
module.exports.getAllRides = (callback) => {
    ride.find(callback)
};

module.exports.getRideById = (id, callback) => {
    let query = { _id: id};
    ride.find(query, callback)
};

//save rides to mongodb
module.exports.addRide = (newRide, callback) => {
    newRide.save(callback)
};

module.exports.deleteRidebyId = (id, callback) => {
    let query = { _id: id};
    ride.remove(query, callback)
};