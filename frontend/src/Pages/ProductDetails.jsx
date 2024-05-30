import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Paper,
  Grid,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { ArrowBack } from "@material-ui/icons";
import axios from "axios";
import ProductDetail from "./css/ProductDetails.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

const ProductDetails = () => {
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
const isLargeScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const { farmerId, type, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/${id}`
        );
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);
  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart", {
        productId: product._id,
        vendorId: product.vendorId,
        farmerId: farmerId,
        quantity: 1,
      });
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }
  

  return (
    <Paper elevation={3} className="product-details">
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6}>
          <IconButton
            component={Link}
            to={`/farmer/products/${farmerId}/${type}`}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5">{product?.name}</Typography>
          <Box
            height={isSmallScreen ? "100%" : "80%"}
            width={isSmallScreen ? "100%" : "80%"}
            style={{ marginLeft: isSmallScreen ? "0" : "150px" }}
          >
            <img
              src={product?.imageUrl}
              alt={product?.brand}
              className="product-image"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="details" sx={{ marginTop: "40px" }} width={"100%"}>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                fontSize: isSmallScreen ? "20px" : "35px",
                width: isLargeScreen ? "80%" : "100%",
              }}
            >
              Name: {product?.Name}
            </Typography>
            <Typography
              variant="h6"
              sx={{ marginTop: "20px" }}
              style={{ fontSize: isSmallScreen ? "15px" : "25px" }}
            >
              Brand: {product?.brand}
            </Typography>
            <Typography
              sx={{ fontSize: "20px", marginTop: "20px" }}
              style={{
                fontSize: isSmallScreen ? "15px" : "25px",
                marginTop: "20px",
              }}
              width="30%"
            >
              Description: {product?.description}
            </Typography>
            <Typography
              sx={{ marginTop: "20px" }}
              style={{
                fontSize: isSmallScreen ? "15px" : "25px",
                marginTop: "20px",
              }}
            >
              Price: ₹{product?.price}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: "20px",
              }}
              width={isLargeScreen ? "20%" : "50%"}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                fullWidth
                style={{ fontSize: isSmallScreen ? "15px" : "20px" ,marginTop:"10px"}}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ fontSize: isSmallScreen ? "15px" : "20px" ,marginTop:"10px"}}
              >
                Rent Now
              </Button>
              <Link
                to={`/cart/${farmerId}`}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ fontSize: isSmallScreen ? "15px" : "20px" ,marginTop:"10px"}}
                >
                  Go To Cart
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ProductDetails;
