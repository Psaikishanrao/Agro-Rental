const Farmer = require('../Models/Farmer')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const accountSid = "AC3e4c15663fc32f95d8dad97f9e217e86";
const authToken = "2b6f19978fa180f620aaf723d8887b91";
const client = require("twilio")(accountSid, authToken);
const JWT_KEY = process.env.JWT_KEY;

// Function to generate OTP
function generateOTP() {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

let tempOTP = "";

const farmerController = {
  signup: async (req, res) => {
    try {
      const { mobileNumber  } = req.body;

      const existingFarmer = await Farmer.findOne({ mobileNumber });
      if (existingFarmer) {
        return res.status(400).json({ message: 'Mobile number already exists' });
      }

      tempOTP = generateOTP();
      await client.messages.create({
        body: `Your OTP verification for farmer ${mobileNumber} is ${tempOTP}`,
        messagingServiceSid: "MG69b0fe8c3a72b8c8e60e48bd0aaee99d",
        to: mobileNumber,
      });

      res.status(200).json({ message: "OTP Sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { otp: userOTP, mobileNumber, password } = req.body;

      if (userOTP === tempOTP) {
        const newFarmer = new Farmer({
          Name: req.body.Name,
          mobileNumber: req.body.mobileNumber,
          address: req.body.address,
          nearestPoliceStation: req.body.nearestPoliceStation,
          cityVillage: req.body.cityVillage,
          pincode: req.body.pincode,
          password: await bcrypt.hash(password, 12),
          user:"farmer",
        });
        await newFarmer.save();

        tempOTP = "";

        return res.status(200).json({ bool: "true", farmerId: newFarmer._id });
      } else {
        tempOTP = "";
        return res.status(400).json({ bool: "falseO" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ bool: "falseM",error:error });
    }
  },
  forgotPIN: async (req, res) => {
    try {
      const { mobileNumber, otp, NewPassword } = req.body;
      const farmer = await Farmer.findOne({ mobileNumber });
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      if (otp !== tempOTP) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      farmer.password = await bcrypt.hash(NewPassword, 12);
      await farmer.save();

      tempOTP = "";
  
      res.status(200).json({ message: 'Password updated successfully',msg:"true" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  login: async (req, res) => {
    try {
      const { mobileNumber, password } = req.body;
      const user = await Farmer.findOne({ mobileNumber });
      if (!user) {
        return res.status(404).json({ msg: "User not found",bool:"Ufalse" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Server error",bool:"Pfalse" });
        }
        if (result) {
          // const token = jwt.sign({ userID: user._id }, JWT_KEY);
          const Id=user._id;
          return res.status(200).json({ bool: "true", farmerId:Id}); 
        } else {
          return res.status(401).json({ msg: "Wrong credentials" });
        }
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Server error" });
    }
  },
  
  details: async (req, res) => {
    try {
      const { farmerId } = req.params;
      const details = await Farmer.findOne({ _id: farmerId }); 
      if (details) {
        res.status(200).json({ details });
      } else {
        res.status(404).json({ msg: 'Details not found' });
      }
    } catch (error) {
      console.error('Error fetching details:', error.message);
      res.status(500).json({ msg: 'Internal server error' });
    }
  }
  
  
};

module.exports = farmerController;
