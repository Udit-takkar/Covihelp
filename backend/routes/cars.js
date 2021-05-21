const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bookingSelectFields = '_id user car bookedtime pickuptime returntime cost location status';
const selectFields = '_id make seats bodytype numberplate colour costperhour fueltype location currentbooking image';

const User = require('../models/user');
const Car=require('../models/car')

// without jwt

//  @route    GET api/cars/
// @desc     Get all cars
// @access   Public
router.get('/',(req,res)=>{
 // get all cars from database
    Car.find()
        .select(selectFields)
        .exec()
        .then(cars => {
            // wrap and return car objects in response
            const response = {
                cars: cars.map(car => {
                    return {
                        id: car._id,
                        location: car.location,
                        currentbooking: car.currentbooking
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {
            // return error if there's any
            console.error(error.message);
            res.status(500).json({ message: `Unable to GET all cars`});
        });

})

//  @route     GET api/cars/:id
// @desc     Get a particular cars
// @access   Public
router.get('/:id',(req, res, next) => {
    // obtain car id from request parameters
    const id = req.params.id;

    // get car by id from database
    Car.findOne({ _id: id })
        .select(selectFields)
        .exec()
        .then(car => {
            // wrap and return car object in response
            const response = {
                car: car
            }
            res.status(200).json(response);
        })
        .catch(error => {
            // return error if there's any
            res.status(500).json({ message: `Unable to GET car of id '${id}'`, error: error });
        });
})

//jwt authorize


   

module.exports=router 