



import React, { createContext, useState, useContext,useEffect } from 'react';
import axios from 'axios';

// Create CartContext
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component
export const CartProvider = ({ children }) => {
  // State to manage cart items
  const [cartItems, setcartItems] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   //console.log("CartItems", cartItems);
  // }, [cartItems]);
  

  // Function to add item to cart
  const addToCart = async (productId, vendorId, farmerId, quantity) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart', { productId, vendorId, farmerId, quantity });
      setcartItems(prevItems => [...prevItems, response.data.data]); 
      // Append new item to cart items
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while adding item to cart');
    }
  };

  //Function to get user's cart
  const getUserCart = async (farmerId) => {
    console.log("get user cart", farmerId);
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/user/${farmerId}`);
      console.log(response.data);
      console.log("Product:", response.data.data.productId);
      const productId = response.data.data.productId;
      
      const productResponse = await axios.get(`http://localhost:5000/api/product/${productId}`);
      console.log("Product response", productResponse.data.data);
  
      // Replace the existing cart items with the new ones
      setcartItems([productResponse.data.data]);
      console.log("CartItems", cartItems);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while fetching user cart');
    }
  };
  

  
  

  

  // Function to remove item from cart
  const removeFromCart = async (itemId) => {
    console.log("Item_id",itemId)
    try {

      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`);
      setcartItems(prevItems => prevItems.filter(item => item._id !== itemId)); // Remove item from cart items
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while removing item from cart');
    }
  };

  // Function to clear user's cart
  const clearCart = async (farmerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/clear/${farmerId}`);
      setcartItems([]); // Clear cart items
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while clearing cart');
    }
  };

  // Function to calculate total
  const getTotal = () => {
    
    return cartItems.reduce((total, item) => total + (item.price * 1), 0);
  };


  
  
  return (
    <CartContext.Provider value={{ cartItems, error, addToCart, getUserCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

