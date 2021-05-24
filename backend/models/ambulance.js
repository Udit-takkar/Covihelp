const mongoose = require('mongoose');

const ambulanceSchema = mongoose.Schema({
    numberplate: { type: String, required: true },
    driversName: { type: String, required: true},
    contact: { type: Number, required: true},
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true },
    available: { type: Boolean},
    password: { type: String, required: true },
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);
