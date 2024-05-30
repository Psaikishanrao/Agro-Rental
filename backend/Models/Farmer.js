// models/Farmer.js
const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  nearestPoliceStation: {
    type: String,
    required: true,
  },
  cityVillage: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
});

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
