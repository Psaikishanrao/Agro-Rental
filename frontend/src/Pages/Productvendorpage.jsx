import {
  Box,
  Text,
  SimpleGrid,
  Image,
  Flex,
  ChakraProvider,
  Stack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import bell from "../images/bell.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Vproductstyles from "./css/Vproductstyles.css";
import { Link } from "react-router-dom";
import add from "../images/add.png";
import contact from "../images/contact.png";
import { AvatarGenerator } from 'random-avatar-generator';
const Productvendorpage = () => {
  const generator = new AvatarGenerator();
  const avatarUrl = generator.generateRandomAvatar();
  const navigate = useNavigate();
  const { vendorID } = useParams();
  const [details, setDetails] = useState({});
  const getdetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/vendors/details/${vendorID}`
      );
      setDetails(response.data.details);
      console.log(response);
    } catch (error) {
      console.error("Error in fetching", error.message);
    }
  };
  useEffect(() => {
    getdetails();
  }, [vendorID]);

  const UserInformation = () => {
    // Assuming avatarUrl is defined and accessible in this scope
    return (
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="25px">
        <Flex alignItems="center" p="6">
          <Image
            src={avatarUrl}
            alt="User Avatar"
            boxSize="150px"
            objectFit="cover"
            borderRadius="full"
            marginRight="80px"
          />
          <Box>
            <Text>Name: {details.Name}</Text>
            <Text>Phone: {details.mobileNumber}</Text>
            <Text>
              Address: {details.address} {details.cityVillage}
            </Text>
            <Text>NearestPoliceStation: {details.nearestPoliceStation}</Text>
            <Text>Pincode: {details.pincode}</Text>
          </Box>
        </Flex>
      </Box>
    );
  };
  
  // const ProductCard = ({ product, farmer }) => (
  //   <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
  //     <Image src={product.image} alt={product.id} />
  //     <Box p="6">
  //       <Box d="flex" alignItems="baseline">
  //         <Text>Product ID: {product.id}</Text>
  //         <Text>Order ID: {product.orderId}</Text>
  //         <Text>Brand: {product.brand}</Text>
  //         <Text>Price: {product.price}</Text>
  //         <Text>Condition: {product.condition}</Text>
  //       </Box>
  //       <Box>
  //         <Text>Name: {farmer.name}</Text>
  //         <Text>Address: {farmer.address}</Text>
  //         <Text>Phone No.: {farmer.phone}</Text>
  //         <Text>Duration: {farmer.duration}</Text>
  //       </Box>
  //     </Box>
  //   </Box>
  // );
  const user = {
    name: "nandu",
    phone: 123345780,
    address: "addeekss",
  };

  const products = [
    {
      id: "TRACTOR657",
      orderId: "JH34D117",
      brand: "John Deere",
      price: "30,000",
      condition: "New",
      farmer: {
        name: "Alam Ali",
        address: "Bagha,Kusma",
        phone: "8835069014",
        duration: "JM.22D-30H",
      },
    },
  ];

  return (
    <>
      <ChakraProvider>
        <Box className="back" display={"flex"} justifyContent={"center"}>
          
          <Box p="5" className="details">
        
            < UserInformation />
          </Box>
          <Box className="icons">
            <Image
              className="img"
              src={add}
              alt="add"
              onClick={() => navigate(`/vendor/addproduct/${vendorID}`)}
              cursor="pointer"
            />
            <Image
              className="img"
              src={bell}
              alt="notification"
              onClick={() => navigate("/notification")}
              cursor="pointer"
            />
            <Image
              className="img"
              src={contact}
              alt="contact"
              onClick={() => navigate("/contactus")}
              cursor="pointer"
            />
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Productvendorpage;
