const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const farmerRoutes = require('./Routes/farmerRoutes');
const vendorRoutes = require('./Routes/vedorRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes =require('./Routes/cartRoutes');
const striperoutes=require('./Routes/stripe-route');
const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/api/stripe',striperoutes)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  });
app.use('/api/farmers', farmerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart',cartRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
