// login: async (req, res) => {
//     try {
//       const { mobileNumber } = req.body;
//       const existingUser = await User.findOne({ mobileNumber });
//       if (existingUser) {
//         tempOTP = generateOTP();

//         await client.messages.create({
//           body: `Your OTP verification for user ${mobileNumber} is ${tempOTP}`,
//           messagingServiceSid: "MG69b0fe8c3a72b8c8e60e48bd0aaee99d",
//           to: mobileNumber,
//         });
//         res.status(200).json({ msg: "true" });
//       }
//       else{
//         res.send.status(400).json({msg:"false"}) //send to frontend mssge false so that in there i can  print first signup
//       }
//     } catch (err) {
//       res.send.status(500).json({msg:"something wen wrong "})//500 for internal server 400 for bad req
//     }
//   },

// router.post('/verifylogin',vendorController.loginverify);