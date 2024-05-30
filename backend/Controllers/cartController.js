const Cart = require('../Models/Cart');

// Controller function to add a product to the cart
const addToCart = async (req, res) => {
    const { productId, vendorId, farmerId, quantity } = req.body;
  
    try {
      // Check if the item already exists in the cart
      let cartItem = await Cart.findOne({ productId, vendorId, farmerId });
  
      if (cartItem) {
        // If the item already exists, return an error message
        return res.status(400).json({ success: false, error: 'Item already exists in the cart' });
      }
  
      // If the item is not in the cart, create a new cart item
      cartItem = new Cart({ productId, vendorId, farmerId, quantity });
      await cartItem.save();
  
      res.status(201).json({ success: true, data: cartItem });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };
  
// Controller function to get the user's cart
const getUserCart = async (req, res) => {
  const { farmerId } = req.params;
  
  try {
    const cartItems = await Cart.findOne({ farmerId });

    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    console.error('Error getting user cart:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller function to remove an item from the cart
// const removeFromCart = async (req, res) => {
//   const { itemId } = req.params;

//   try {
//     const removedItem = await Cart.findByIdAndDelete(itemId);

//     if (!removedItem) {
//       return res.status(404).json({ success: false, error: 'Item not found in cart' });
//     }

//     res.status(200).json({ success: true, data: {} });
//   } catch (error) {
//     console.error('Error removing item from cart:', error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };


const removeFromCart = async (req, res) => {
  const { itemId } = req.params; // this is actually productId
  console.log("ItemId",itemId)
  try {
    // Find the cart item using the productId
    const cartItem = await Cart.findOne({ productId: itemId });

    if (!cartItem) {
      return res.status(404).json({ success: false, error: 'Item not found in cart' });
    }

    // Delete the cart item
    await Cart.findByIdAndDelete(cartItem._id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller function to clear the user's cart
const clearCart = async (req, res) => {
  const { farmerId } = req.params;

  try {
    await Cart.deleteMany({ farmerId });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
  clearCart
};
