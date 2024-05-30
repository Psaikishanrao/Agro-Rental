import React, { useState } from 'react';
import {axios} from 'axios';
import { motion } from "framer-motion"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  Box,
  useMediaQuery,
  Heading,
  ChakraProvider,
  ThemeProvider
} from '@chakra-ui/react';

const AdminLogin = () => {
  const [isMobile] = useMediaQuery("(max-width: 320px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
      const response = await axios.post('/api/admin/login', formData);
      setMessage(response.data.message);
      // You can redirect the user or perform any other action based on the response
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please try again.');
    }
  };

  return (
    <ChakraProvider>
      {/* <ThemeProvider> */}
    <Box minH="100vh" bgGradient="linear(green.500, blue.300, green.800)">
    <Center minH="65vh">
      <Box p="30" bgGradient="linear(green.500, blue.300, green.800)"
        border="solid 1px black" w={isMobile ? "80%" : (isLargerThan768 ? "50%" : "100%")}
        borderRadius={20}
        boxShadow="0 0 20px darkgray, 0 0 20px black"
      >
        <Heading textAlign="center" fontSize="6xl">Admin Login</Heading>
        <form onSubmit={handleSubmit} style={{ fontSize: '18px', fontFamily: 'Arial' }}>
          <FormControl sx={{ marginBottom: "20px" }}>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ marginBottom: "20px" }}>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            
          </FormControl>
          <Button type="submit" w="full" bg=" blue.300" variant='solid'>Login</Button>
          
        </form>
        {message && <p>{message}</p>}
      </Box>
    </Center>
  </Box>
  {/* </ThemeProvider> */}
  </ChakraProvider>
);
};

export default AdminLogin;
