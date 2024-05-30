import React from 'react';
import {
  Box,
  Heading,
  Link,
  FormControl,
  FormLabel,
  Input,
  Center,
  Text,
  Button,
  ChakraProvider
} from '@chakra-ui/react';

const Contact = () => {
  return (
    <ChakraProvider>
      <Center minH="100vh" bg="#c8e8e9">
        <Box
          width={{ base: "90%", md: "85%" }}
          bg="#fff"
          borderRadius="6px"
          boxShadow="0 5px 10px rgba(0, 0, 0, 0.2)"
          p={{ base: "20px", md: "20px 60px 30px 40px" }}
          mt="50px"
          position="relative"
        >
          <Box display="flex" justifyContent="end">
            <Box>
              <Heading as="h3" color="blue.500" mr="30px">
                <Link href="#" textDecoration="none">
                  HOME
                </Link>
              </Heading>
              <Heading as="h3" color="black">
                <Link href="#" textDecoration="none">
                  PRODUCT SUPPORT
                </Link>
              </Heading>
            </Box>
          </Box>

          <Box display="flex">
            <Box width="25%" mt="15px" position="relative">
              <Box className="address details">
                <i className="fas fa-map-marker-alt"></i>
                <Heading as="div" size="md" fontWeight="semibold" mt="2">
                  Address
                </Heading>
                <Text fontSize="sm">
                  <b>123 Product Street, Tech City, Innovation Land, 54321</b>
                </Text>
              </Box>
              <Box className="phone details">
                <i className="fas fa-phone-alt"></i>
                <Heading as="div" size="md" fontWeight="semibold" mt="2">
                  Phone
                </Heading>
                <Text fontSize="sm">(123) 456-7890</Text>
              </Box>
              <Box className="email details">
                <i className="fas fa-envelope"></i>
                <Heading as="div" size="md" fontWeight="semibold" mt="2">
                  Email
                </Heading>
                <Text fontSize="sm">support@productcompany.com</Text>
              </Box>
            </Box>
            <Box width="75%" ml="75px">
              <Heading as="div" size="lg" fontWeight="semibold" color="teal.500">
                HAVE A QUESTION OR ISSUE?
              </Heading>
              <Text mt="2" fontSize="md">
                Fill out the form below, and our support team will get back to you about your product-related issues.
              </Text>
              <form action="#">
                <FormControl id="name" mt="4">
                  <FormLabel>Name:</FormLabel>
                  <Input type="text" placeholder="Enter your name" />
                </FormControl>
                <FormControl id="email" mt="4">
                  <FormLabel>Email:</FormLabel>
                  <Input type="email" placeholder="Enter your email" />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt="4">
                  Send Message
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default Contact;
