import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, useTheme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
    border: "1px",
    borderColor:"black"
  },
  cardMedia: {
    paddingTop: '56.25%',
    height: 0,
    paddingTop: '75%',
  },
  cardContent: {
    flexGrow: 1,
    padding: '16px',
  },
  detailText: {
    fontSize: (props) => props.isSmallScreen ? '0.8rem' : '2rem',
  },
}));

const ProductCard = ({ product, farmerId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSmallScreen });

  const [Bname, setBname] = useState("");

  useEffect(() => {
    const fetchBname = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/Bname/${product._id}`);
        if (!response.data.bool) {
          setBname(response.data.Bname);
        } else {
          console.log("Error fetching Bname");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBname();
  }, [product._id]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <Link to={`/farmer/products/${farmerId}/${product.type}/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <CardMedia
            className={classes.cardMedia}
            image={product.imageUrl}
            title={product.brand}
            style={{ paddingTop: isSmallScreen ? '100%' : '75%' }}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.detailText}>
              {product.brand} - {product.model}
            </Typography>
            <Typography className={classes.detailText}>
              Type: {product.type}
            </Typography>
            <Typography variant="h6" className={classes.detailText}>
              Price: Rs.{product.price} Per Hour
            </Typography>
            <Typography variant="h6" className={classes.detailText}>
              Bussiness Name: {Bname}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default ProductCard;
