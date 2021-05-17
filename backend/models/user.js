const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: String,
  email: {
    type: String,
    required: true,
  },
  vounteeringFor: String,
  availability: String,
  alert: String,
  location: String,
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);