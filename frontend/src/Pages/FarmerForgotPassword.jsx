import React, { useState } from 'react';
import {axios} from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Button, Box, Heading, Center, ChakraProvider ,ThemeProvider} from '@chakra-ui/react';

const FarmerForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: '',
    otp: '',
    newPassword: ''
  });
  const [message, setMessage] = useState('');

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
      const response = await axios.post('http://localhost:5000/api/farmers/forgot-password', formData);
      setMessage(response.data.message);
      if(response.data.msg==="true"){
        navigate('/login/farmer');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <ChakraProvider>
      {/* <ThemeProvider> */}
      <Box minH="100vh" bgGradient="linear(#D4E7C5,#BFD8AF,#99BC85)">
        <Center minH="65vh">
          <Box p="30" bgGradient="linear(#D4E7C5,#BFD8AF,#99BC85)" w="100%" maxW="400px" borderRadius={20} boxShadow="0 0 20px darkgray, 0 0 20px black">
            <Heading textAlign="center" fontSize="6xl" mb="6">Forgot Password</Heading>
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
                <FormLabel htmlFor="otp">OTP:</FormLabel>
                <Input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ marginBottom: "20px" }}>
                <FormLabel htmlFor="newPassword">New Password:</FormLabel>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme="blue" type="submit" w="full">Reset Password</Button>
            </form>
            {message && <p>{message}</p>}
            <p textAlign="center" mt="4">Remember your password? <Link to="/login/farmer">Login</Link></p>
          </Box>
        </Center>
      </Box>
      {/* </ThemeProvider> */}
    </ChakraProvider>
  );
};

export default FarmerForgotPassword;
