

const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Bname:{
    type:String,
    required:true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  nearestPoliceStation: {
    type: String,
    required: true
  },
  cityVillage: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  password:{
    type:String,
    required:true
  },
  user: {
    type: String,
  },
},{
  versionKey: false, 
  timestamps: true  
}
);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;

