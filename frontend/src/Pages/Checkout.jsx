import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Paper } from '@mui/material';

const CheckoutPage = () => {
  const { farmerId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    Name: '',
    mobileNumber: '',
    address: '',
    nearestPoliceStation: '',
    cityVillage: '',
    pincode: ''
  });

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/farmers/details/${farmerId}`);
        setBillingDetails(response.data.details);
      } catch (error) {
        console.error('Error fetching farmer details:', error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/user/${farmerId}`);
        const cartData = response.data.data;
        const productRequests = cartData.map(item => axios.get(`http://localhost:5000/api/product/${item.productId}`));

        const productResponses = await Promise.all(productRequests);
        const products = productResponses.map(res => res.data.data);

        setCartItems(products);
        console.log("CartItems", products);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchFarmerDetails();
    fetchCartItems();
  }, [farmerId]);

  const getTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * 1), 0);
    console.log("Total Amount: ", total);
    return total;
  };

  const handleToken = async (token) => {
    try {
      await axios.post("http://localhost:5000/api/stripe/pay", {
        token: token.id,
        amount: getTotal() * 100 // Multiply by 100 to convert to cents for Stripe
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      {/* <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Order Summary</Typography>
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${item.name} - $${item.price}`} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Total: ${getTotal()}</Typography>
      </Paper> */}
      <Box display="flex" justifyContent="center">
        <StripeCheckout
          stripeKey="pk_test_51Om15sSAdmYRJwvS7dKDYIz4aA21Ur47rfpsS7LFIT5rPctAk1zWAn712c4dx0HrUTbda0mLH6V9TqjB4rNGLLyS00VAkXNdVu"
          token={handleToken}
          amount={getTotal() * 100} // Convert to cents for Stripe
          name="Your Company Name"
          description="Payment for products"
          billingAddress
          shippingAddress
        >
          <Button variant="contained" color="primary">
            Pay with Card
          </Button>
        </StripeCheckout>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
