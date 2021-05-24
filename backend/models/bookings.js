/* Booking model definition */
const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ambulance: { type: mongoose.Schema.Types.ObjectId, ref: "Ambulance", required: true },
  bookedtime: { type: Date, required: true },
  userCoordinates: { type: [Number], required: true },
  ambulanceCoordinates: { type: [Number], required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
