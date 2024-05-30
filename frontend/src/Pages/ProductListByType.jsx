import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  gridContainer: {
    spacing: 4,
  },
}));

const ProductListByType = () => {
  const classes = useStyles();
  const { farmerId, type } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/type/${type}`);
        setProducts(response.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [farmerId, type]);

  return (
    <Box className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {type}
      </Typography>
      <Grid container className={classes.gridContainer}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} farmerId={farmerId} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListByType;
