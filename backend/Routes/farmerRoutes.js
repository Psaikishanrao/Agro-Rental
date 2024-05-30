const express = require('express');
const router = express.Router();
const farmerController = require('../Controllers/farmerController');

router.post('/signup', farmerController.signup);
router.post('/login', farmerController.login);
router.post('/forgot-password', farmerController.forgotPIN);
router.get('/details/:farmerId', farmerController.details);
router.post('/verify', farmerController.verifyOTP);
module.exports = router;
