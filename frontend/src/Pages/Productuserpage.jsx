import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  ChakraProvider,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Uproductstyles from "./css/Uproductstyles.css";
import tractor from "../images/tractor.png";
import cult from "../images/cult.png";
import { useParams } from "react-router-dom";
import baler from "../images/baler.jpg";
import Tractor from "../images/Tractor.png";
import rotavtor from "../images/rotavtor.png";
import thresher from "../images/thresher.jpg";
import cultivator1 from "../images/cultivator1.png";
import digger from "../images/digger.png";
import sdrill from "../images/seeddrill.webp";
const ProductPage = () => {
  const { farmerId } = useParams();
  console.log(farmerId);
  const navigate = useNavigate();
  const user = {
    Name: "John Doe",
    phoneNumber: "123-456-7890",
    location: "New York, USA",
    pincode: "10001",
  };
  const [details, setDetails] = useState({});
  const getdetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/farmers/details/${farmerId}`
      );
      setDetails(response.data.details);
      console.log(response);
    } catch (error) {
      console.error("Error in fetching", error.message);
    }
  };
  useEffect(() => {
    getdetails();
  }, [farmerId]);
  const products = [
    { id: 1, name: "Rotavtor", image: rotavtor },
    { id: 2, name: "Digger", image: digger },
    { id: 3, name: "Tractor", image: Tractor },
    { id: 4, name: "Cultivator", image: cultivator1 },
    { id: 5, name: "Thresher", image: thresher },
    { id: 6, name: "Baler", image: baler },
    { id: 7, name: "seed_drill", image: sdrill },
    // { id: 8, name: "drone",      image:drone},
  ];
  const handleOnClick = (name) => {
    const type = name;
    navigate(`/farmer/products/${farmerId}/${type}`);
  };

  // base: "0px",
  // sm: "320px",
  // md: "768px",
  // lg: "960px",
  // xl: "1200px",
  // "2xl": "1536px",
  return (
    <div>
      <ChakraProvider>
        <Box className="image">
          <Stack direction="column" spacing={{ base: 4, md: 8 }} width={"100%"}>
            <Box className="Pheader">
              <ChakraProvider>
                <Text
                  fontSize={{ sm: "20px", md: "40px", lg: "50px" }}
                  marginTop={{ sm: "20px", md: "50px", lg: "80px" }}
                >
                  AGRO RENTAL
                </Text>
              </ChakraProvider>
            </Box>
            <Box className="parent">
              <Box className="tractor">
                <img src={tractor} id="tract" />
              </Box>
              <ChakraProvider>
                <Box className="txt">
                  <Text
                    fontSize={{ sm: "10px", md: "40px", lg: "40px" }}
                    color={"white"}
                  >
                    Vendor to Farmer
                  </Text>
                  <Text
                    fontSize={{ sm: "10px", md: "40px", lg: "40px" }}
                    color={"white"}
                  >
                    Equipment Rental Service
                  </Text>
                </Box>
              </ChakraProvider>
              <Box className="cult">
                <img src={cult} id="cult" />
              </Box>
            </Box>
          </Stack>
          <Box className="userdetails" marginBottom={'30px'}>
            <text fontWeight="bold" fontSize="xl" mb={2} color="white">
              User Details
            </text>
            <br />
            <text mt={2} color="black">
              <strong>Name:</strong> {details.Name}
            </text>
            <br />
            <text mt={2} color="black">
              <strong>Phone Number:</strong> {details.mobileNumber}
            </text>
            <br />
            <text mt={2} color="black">
              <strong>Location:</strong> {details.address}
              {details.cityVillage}
            </text>
            <br />
            <text mt={2} color="black">
              <strong>Pincode:</strong> {details.pincode}
            </text>
            <br />
            <text mt={2} color="black">
              <strong>Police station:</strong> {details.nearestPoliceStation}
            </text>
          </Box>
        </Box>
        <Box p={4} className="grids" marginLeft={"50px"}>
          <Heading size="md" mb={4}>
            Products
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {products.map((product) => (
              <GridItem key={product.id}>
                <Box
                  borderWidth="1px"
                  rounded="lg"
                  p={4}
                  borderColor="gray.200"
                  width="80%"
                  height="100%"
                >
                  <img
                    src={product.image}
                   style={{height:"400px"}}
                    className="product-image"
                    onClick={() => handleOnClick(product.name)}
                    alt={product.name}
                  />
                  <Heading size="lg" mb={2} fontWeight="bold">
                    {product.name}
                  </Heading>

                  <Box></Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default ProductPage;
