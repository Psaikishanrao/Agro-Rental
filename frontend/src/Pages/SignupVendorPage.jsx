import React, { useState, useEffect } from "react";
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
  Text,
  NumberInput,
  NumberInputField,
  ChakraProvider,
} from "@chakra-ui/react";

const SignupVendorPage = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Bname: "",
    mobileNumber: "",
    address: "",
    nearestPoliceStation: "",
    cityVillage: "",
    pincode: "",
    password: "",
  });
  const [otpData, setOtpData] = useState({
    otp: "",
    showMessage: false,
    message: "",
  });
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const isFormFilled = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        return false;
      }
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormFilled()) {
      alert("Please fill in all the fields.");
      return;
    }
    setIsSendingOTP(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/vendors/signup",
        formData
      );
      setOtpData({
        ...otpData,
        showMessage: true,
        message: response.data.msg,
      });
      setTimer(30);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setOtpData({
        ...otpData,
        message: "Error signing up. Please try again later.",
      });
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/vendors/verify-otp",
        {
          ...formData,
          otp: otpData.otp.toString().padStart(4, "0"), // Ensure OTP has 4 digits
        }
      );
      if (response.data.success) {
        const vendorId = response.data.vendorId;
        navigate(`/vendor/dashboard/${vendorId}`);
      } else {
        console.log("Signup not successful:", response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      setOtpData({
        ...otpData,
        message: "Invalid OTP. Please try again.",
      });
    }
  };

  const [isMobile] = useMediaQuery("(max-width: 320px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <ChakraProvider>
      <Box minH="100vh" bgGradient="linear(green.500, blue.300, green.800)">
        <Center minH="100vh">
          <Box
            p="30"
            bgGradient="linear(green.500, blue.300, green.800)"
            w={isMobile ? "80%" : isLargerThan768 ? "50%" : "100%"}
            borderRadius={20}
            boxShadow="0 0 20px darkgray, 0 0 20px black"
          >
            <Heading textAlign="center" fontSize="6xl">
              Vendor Signup
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="Name" isRequired>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  value={formData.Name}
                  onChange={handleChange}
                  id="VName"
                  name="Name"
                />
              </FormControl>
              <FormControl id="Bname" isRequired>
                <FormLabel>Business Name:</FormLabel>
                <Input
                  type="text"
                  value={formData.Bname}
                  onChange={handleChange}
                  id="Bname"
                  name="Bname"
                />
              </FormControl>
              <FormControl id="mobileNumber" isRequired>
                <FormLabel>Mobile Number:</FormLabel>
                <Input
                  type="number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  id="VmobileNumber"
                  name="mobileNumber"
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Address:</FormLabel>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  id="Vaddress"
                  name="address"
                />
              </FormControl>
              <FormControl id="nearestPoliceStation" isRequired>
                <FormLabel>Nearest Police Station:</FormLabel>
                <Input
                  type="text"
                  value={formData.nearestPoliceStation}
                  onChange={handleChange}
                  id="VnearestPoliceStation"
                  name="nearestPoliceStation"
                />
              </FormControl>
              <FormControl id="cityVillage" isRequired>
                <FormLabel>City/Village:</FormLabel>
                <Input
                  type="text"
                  value={formData.cityVillage}
                  onChange={handleChange}
                  id="VcityVillage"
                  name="cityVillage"
                />
              </FormControl>
              <FormControl id="pincode" isRequired>
                <FormLabel>Pincode:</FormLabel>
                <Input
                  type="number"
                  value={formData.pincode}
                  onChange={handleChange}
                  id="Vpincode"
                  name="pincode"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="Vpassword"
                  name="password"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                mt={4}
                disabled={isSendingOTP || timer > 0}
              >
                {isSendingOTP
                  ? "Sending OTP..."
                  : timer > 0
                  ? `Retry in ${timer}s`
                  : "Send OTP"}
              </Button>
            </form>
            {otpData.showMessage && (
              <Box>
                <Text>{otpData.message}</Text>
                <form onSubmit={handleOTPSubmit}>
                  <FormControl id="otp" isRequired>
                    <FormLabel>Enter OTP</FormLabel>
                    <NumberInput
                      value={otpData.otp}
                      onChange={(value) =>
                        setOtpData({ ...otpData, otp: value })
                      }
                    >
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                  <Button type="submit" colorScheme="blue" mt={4}>
                    Verify OTP
                  </Button>
                </form>
              </Box>
            )}
          </Box>
        </Center>
      </Box>
    </ChakraProvider>
  );
};
export default SignupVendorPage;
