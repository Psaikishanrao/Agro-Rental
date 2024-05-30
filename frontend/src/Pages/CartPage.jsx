import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import CartItem from '../Components/CartItem';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  makeStyles
} from '@material-ui/core';
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  checkoutButton: {
    marginTop: theme.spacing(2)
  }
}));

const CartPage = () => {
  const classes = useStyles();
  const { farmerId } = useParams();
  const { cartItems, clearCart, getTotal, getUserCart } = useCart();

  useEffect(() => {
    getUserCart(farmerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/clear/${farmerId}`);
      clearCart(farmerId);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Order Summary</Typography>
              <Typography>Total: ${getTotal()}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearCart}
                className={classes.checkoutButton}
              >
                Clear Cart
              </Button>
              <Link to={'/Checkout'}>
              <Button
                variant="contained"
                color="primary"
                className={classes.checkoutButton}
              >
                Checkout
              </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
