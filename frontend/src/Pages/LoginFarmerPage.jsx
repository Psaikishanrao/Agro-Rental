import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Button, Box, Heading, Center, ChakraProvider, ThemeProvider } from '@chakra-ui/react';
// import farmerlogin from "../images/farmerlogin.jpg";
import Loginuser from "./css/Loginuser.css";
const FarmerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [userNotFound, setUserNotFound] = useState(false); // State to indicate if user is not found

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/farmers/login', formData);
      if (response.data.bool === "Pfalse") {
        setMessage('Incorrect PIN. Please try again.');
      } else if (response.data.bool === "Ufalse") {
        setUserNotFound(true); // Set userNotFound state to true
      } else if (response.data.bool === "true") {
        const farmerId=response.data.farmerId;
        navigate(`/farmer/products/${farmerId}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please try again.');
    }
  };

  return (
    <ChakraProvider>
      {/* <ThemeProvider> */}
      {/* bgGradient="linear(#D4E7C5,#BFD8AF,#99BC85)" */}
      <Box minH="100vh" className='main'>
        <Center minH="65vh">
          <Box p="30"  className='box' bgGradient="linear(#D4E7C5,#BFD8AF,#99BC85)"  borderRadius={20} boxShadow="0 0 20px darkgray, 0 0 20px black">
            <Heading textAlign="center" fontSize="6xl" mb="6">Farmer Login</Heading>
            <form onSubmit={handleSubmit} style={{ fontSize: '18px', fontFamily: 'Arial' }}>
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
              <Button colorScheme="blue" type="submit" >Login</Button>
            </form>
            <p textAlign="center" mt="4">Forgot your PIN? <Link to="/forgot-password">Click here</Link> to reset it.</p>
            {userNotFound && (
              <p textAlign="center" mt="4">
                User not found. <Link to="/signup/farmer">Sign up</Link> as a new farmer.
              </p>
            )}
            {message && <p>{message}</p>}
            <p textAlign="center" mt="4">Signup<Link to="/signup/farmer">Click here</Link></p>
          </Box>
        </Center>
      </Box>
      {/* </ThemeProvider> */}
    </ChakraProvider>
  );
};
export default FarmerLogin;
