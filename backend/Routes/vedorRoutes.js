const express = require('express');
const router = express.Router();
const vendorController = require('../Controllers/vendorController');

// Signup route for vendors
router.post('/signup', vendorController.signup);
router.post('/verify-otp', vendorController.verifyOTP);
router.post('/login',vendorController.login)
router.get('/details/:vendorID',vendorController.details)

module.exports = router;
