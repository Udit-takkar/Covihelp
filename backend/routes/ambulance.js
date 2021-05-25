const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bookingSelectFields =
  "_id user car bookedtime pickuptime returntime cost location status";
const selectFields =
  "_id make seats bodytype numberplate colour costperhour fueltype location currentbooking image";

const User = require("../models/user");
const Ambulance = require("../models/ambulance");

// without jwt

//  @route    GET api/cars/
// @desc     Get all cars
// @access   Public
router.get("/", (req, res) => {
  // get all ambulances from database  { available: true }
  Ambulance.find({})
    .then((ambulances) => {
      // wrap and return ambulance objects in response
      const response = {
        ambulances: ambulances,
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      // return error if there's any
      console.error(error.message);
      res.status(500).json({ message: `Unable to GET all ambulances` });
    });
});

//  @route     GET api/cars/:id
// @desc     Get a particular cars
// @access   Public
router.get("/:id", (req, res, next) => {
  // obtain ambulance id from request parameters
  const id = req.params.id;

  // get ambulance by id from database
  Ambulance.findOne({ _id: id })
    .then((ambulance) => {
      const response = {
        ambulance: ambulance,
      };
      // console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      // return error if there's any
      res.status(500).json({
        message: `Unable to GET ambulance of id '${id}'`,
        error: error,
      });
    });
});

router.post("/register", async (req, res) => {
  const { numberplate, password } = req.body;

  try {
    let ambulance = await Ambulance.findOne({ numberplate });

    if (ambulance) {
      return res.status(400).json({
        msg: "Ambulance already exists.",
      });
    }

    ambulance = new Ambulance(req.body);

    const salt = await bcrypt.genSalt(10);

    ambulance.password = await bcrypt.hash(password, salt);

    await ambulance.save();

    const payload = {
      ambulance: {
        id: ambulance.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        const response = {
          message: `Registerd Ambulance of id '${ambulance.id}' successfully`,
          ambulance: {
            _id: ambulance.id,
            driversName: ambulance.driversName,
            numberplate: ambulance.numberplate,
            contact: ambulance.contact,
            address: ambulance.address,
            coordinates: ambulance.coordinates,
            available: ambulance.available,
            token,
          },
        };
        return res.status(201).json({ response });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//jwt authorize
module.exports = router;
