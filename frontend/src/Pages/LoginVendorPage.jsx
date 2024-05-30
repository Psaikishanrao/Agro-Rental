import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Box,
  useMediaQuery,
  Heading,
  ChakraProvider,
  Text,
} from "@chakra-ui/react";
import Loginvendor from "./css/Loginvendor.css";
const VendorLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });
  const [isMobile] = useMediaQuery("(max-width: 320px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [message, setMessage] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/vendors/login', {
        mobileNumber: formData.mobileNumber,
        password: formData.password
      }); 
      if (response.data.msg === "true") {
        const vendorId = response.data.id;
        navigate(`/vendor/dashboard/${vendorId}`);
      } else if(response.data.bool === false) {
        setUserNotFound(true);
      } else {
        console.log('Signup not successful, OTP is incorrect');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  return (
    <ChakraProvider>
      {/* bgGradient="linear(#D4E7C5,#BFD8AF,#99BC85) */}
      <Box minH="100vh" className="main">
        <Center minH="65vh">
          <Box
            p="30"
            bgGradient="linear(#D4E7C5,#BFD8AF,#99BC85)"
            className="box"
            borderRadius={20}
            boxShadow="0 0 20px darkgray, 0 0 20px black"
          >
            <Heading textAlign="center" fontSize="6xl" mb="6">
              Vendor Login
            </Heading>
            <form
              onSubmit={handleSubmit}
              style={{ fontSize: "18px", fontFamily: "Arial" }}
            >
              <FormControl sx={{ marginBottom: "20px" }}>
                <FormLabel htmlFor="mobileNumber">Mobile Number:</FormLabel>
                <Input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ marginBottom: "20px" }}>
                <FormLabel htmlFor="password">PASSWORD:</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme="blue" type="submit">
                Login
              </Button>
            </form>
            <Text textAlign="center" mt="4">
              Forgot your PIN? <Link to="/forgot-password">Click here</Link> to
              reset it.
            </Text>
            {!userNotFound && message && <Text textAlign="center">{message}</Text>}
            {userNotFound && (
              <Text textAlign="center" mt="4">
                User not found. <Link to="/signup/vendor">Sign up</Link> as a
                new vendor.
              </Text>
            )}
            {message && <Text textAlign="center">{message}</Text>}
            <Text textAlign="center" mt="4">
              Signup<Link to="/signup/vendor">Click here</Link>
            </Text>
          </Box>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default VendorLoginPage;
