const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

// Route to add an item to the cart
router.post('/', cartController.addToCart);

// Route to get the user's cart
router.get('/user/:farmerId', cartController.getUserCart);

// Route to remove an item from the cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// Route to clear the cart
router.delete('/clear/:farmerId', cartController.clearCart);

module.exports = router;
