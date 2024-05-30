// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Login route for admins
router.post('/login', adminController.login);

module.exports = router;
