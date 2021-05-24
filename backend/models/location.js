/* Location model definition */
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: { type: String }, // first name
  address: { type: String, required: true },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  coordinates: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
