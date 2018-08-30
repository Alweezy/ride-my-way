const express = require('express');
const router = express.Router();
const ride = require('../app/models/ride');


// get all rides
router.get('/', (req, res) => {
    ride.getAllRides((err, rides) => {
        if (err){
            res.json({
                success: false,
                message: `Failed to load all rides.
                Error: ${err}`
            });
        } else {
            res.write(JSON.stringify({success: true,
            rides: rides}, null, 2));
            res.end();
        }
    });
});


// get ride by id
router.get('/:id', (req, res) => {
    var id = req.params.id;
    //call the model method getRideById
    ride.getRideById(id,(err, ride)=> {
        if (err) {
            res.json({success: false,
            message: `Failed to get this ride. Error: ${err}`});

        }else{
            res.write(JSON.stringify({success: true,
            ride: ride}, null, 2));
            res.end();
        }
    })
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    ride.deleteRidebyId(id, (err, ride) => {
        if (err) {
            res.json({
                success: false,
                message: `Failed to delete this ride.
                Error: ${err}`
            });
        }else{
            res.json({success: true,
            message: `Ride deleted successfully`})
        }
    })
});

// add a ride
router.post('/', (req, res) => {
    var newRide = new ride({
        title: req.body.title,
        description: req.body.description
    });
    ride.addRide(newRide, (err, ride) => {
        if(err) {
            res.json({ success: false,
            message: `Failed to create a new ride. Error ${err}`});
        }else{
            res.json({success: true,
            message: `Ride created successfully`})
        }
    })
});


module.exports = router;

