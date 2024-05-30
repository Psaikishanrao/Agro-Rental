import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Box, useMediaQuery, Center, Icon, Text,ChakraProvider } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa'; 
import { MdBuild } from "react-icons/md";
import backgroundImage from '../images/agbg.jpg';
import Language from './Language';
const LandingPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 320px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const containerStyle = {
    position: 'relative',
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  const blurOverlayStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(5px)',
    zIndex: -1,
  };

  const adminButtonStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  };

  return (
    <ChakraProvider>
    <Box minH="90vh" pt="70" style={containerStyle}>
      {/* <Language/> */}
      <Box style={backgroundStyle} />
      <Box style={blurOverlayStyle} />
      <Heading textAlign="center" fontSize="6xl" padding="50px 50px 10px 50px" style={{
        textShadow: '2px 2px 4px rgba(0, 100, 0, 10)', 
      }}>Agro Rental</Heading>
      <Heading textAlign="center" fontSize="md" fontStyle="italic">FEELS REAL AND AUTHENTIC</Heading>

      <Center>
        <Box pt="90" textAlign="center" w={isMobile ? "80%" : (isLargerThan768 ? "50%" : "100%")}>
          <Box marginTop={"20px"}>
          <Heading as='b' fontSize="2xl" color='white' style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 50)', 
          }}>Welcome to Agro Rental,<br /> All Farming Equipments at reasonable prices.</Heading>
          <br /><br />
          <Text as='i' color="white">Start now with just one click.</Text>
          <br />
          </Box>
          <Box style={{marginTop:"50px"}}>
          <Link to="/login/farmer">
            
            <Button m="5" leftIcon={<Icon as={FaUser} />} bgGradient="linear(green.600, green.300, green.800)" variant="solid" fontSize="20px" fontStyle="bold">Farmer</Button>
          </Link>
          <Link to="/login/vendor">
            <Button m="5" leftIcon={<Icon as={FaUser} />} bgGradient="linear(green.600, green.300, green.800)" variant="solid" fontSize="20px" fontStyle="bold">Vendor</Button>
          </Link>
          <Link to="/login/admin">
          <Button m="5" leftIcon={<Icon as={FaUser} />} bgGradient="linear(green.600, green.300, green.800)" variant="solid" fontSize="20px" fontStyle="bold">Admin</Button>
        </Link>
          </Box>
        </Box>
      </Center>
   
      <Box style={adminButtonStyle}>
        
      </Box>
    </Box>
    </ChakraProvider>
  );
};

export default LandingPage;