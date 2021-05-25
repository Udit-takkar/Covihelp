const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Ambulance = require("../models/ambulance");
const Booking = require("../models/bookings");

router.get("/", (req, res) => {
  Booking.find()
    .then((bookings) => {
      // wrap and return bookings objects in response
      const response = {
        bookings: bookings,
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      // return error if there's any
      console.error(error.message);
      res.status(500).json({ message: `Unable to GET all bookings` });
    });
});

router.get("/:id", (req, res, next) => {
  // obtain booking id from request parameters
  const id = req.params.id;

  // get booking by id from database
  Booking.findOne({ _id: id })
    .then((booking) => {
      const response = {
        booking: booking,
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      // return error if there's any
      res
        .status(500)
        .json({ message: `Unable to GET booking of id '${id}'`, error: error });
    });
});

router.post("/createBooking", (req, res) => {
  try {
    const booking = new Booking(req.body);
    booking.save().then((booking) => {
      Ambulance.updateOne(
        { _id: req.body.ambulance },
        { $set: { available: false } }
      ).then(() => {
        booking.populate("ambulance", function (err) {
          console.log(err);
          console.log(booking);
          const response = {
            booking: booking,
          };

          res.status(200).json(response);
        });
      });
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
