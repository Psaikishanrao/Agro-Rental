const User = require("../Models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const accountSid = "AC3e4c15663fc32f95d8dad97f9e217e86";
const authToken = "2b6f19978fa180f620aaf723d8887b91";
const client = require("twilio")(accountSid, authToken);
const JWT_KEY = process.env.JWT_KEY;

function generateOTP() {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

let tempOTP = "";

const vendorController = {
  signup: async (req, res) => {
    try {
      const newuser = ({ mobileNumber } = req.body);

      const existingUser = await User.findOne({ mobileNumber });
      if (existingUser) {
        return res.status(400).json({
          msg: "User with the same number already exists! Please check and try again",
        });
      }
      tempOTP = generateOTP();

      await client.messages.create({
        body: `Your OTP verification for user ${mobileNumber} is ${tempOTP}`,
        messagingServiceSid: "MG69b0fe8c3a72b8c8e60e48bd0aaee99d",
        to: mobileNumber,
      });

      res.status(200).json({ msg: "OTP Sent" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { otp: userOTP, mobileNumber, password } = req.body;
      if (userOTP === tempOTP) {
        const newUser = new User({
          Name: req.body.Name,
          mobileNumber: req.body.mobileNumber,
          address: req.body.address,
          nearestPoliceStation: req.body.nearestPoliceStation,
          cityVillage: req.body.cityVillage,
          pincode: req.body.pincode,
          password: await bcrypt.hash(password, 12),
          Bname:req.body.Bname,
          user:"vendor"
        });
        const vendorId = newUser._id;
        await newUser.save();
        tempOTP = "";
        return res.status(200).json({ success: true, vendorId });
      } else {
        return res.status(400).json({ success: false, message: "Invalid OTP",otp:tempOTP,uotp:userOTP });
      }
      tempOTP = "";
    } catch (e) {
      tempOTP = "";
      console.error(e);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { mobileNumber, password } = req.body;
      const user = await User.findOne({ mobileNumber });
      if (!user) {
        return res.status(404).json({ bool:false });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Server error" });
        }
        if (result) {
          // const token = jwt.sign({ userID: user._id }, JWT_KEY);
          const id = user._id;
          return res.status(200).json({ msg: "true", id });
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
      const { vendorID } = req.params;
      const details = await User.findOne({ _id: vendorID });
      if (details) {
        res.status(200).json({ details });
      } else {
        res.status(404).json({ msg: "Details not found" });
      }
    } catch (error) {
      console.error("Error fetching details:", error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

module.exports = vendorController;
