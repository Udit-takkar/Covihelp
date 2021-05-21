/* Location model definition */
const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {type:String},
    address: { type: String, required: true },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

module.exports = mongoose.model('Location', locationSchema);
