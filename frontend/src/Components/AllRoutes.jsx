// AllRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginFarmerPage from '../Pages/LoginFarmerPage';
import LoginAdminPage from '../Pages/LoginAdminPage';
import LoginVendorPage from '../Pages/LoginVendorPage';
import SignupFarmerPage from '../Pages/SignupFarmerPage';
import SignupVendorPage from '../Pages/SignupVendorPage';
import Productuserpage from '../Pages/Productuserpage';
import Productvendorpage from '../Pages/Productvendorpage'
import FarmerForgotPassword from "../Pages/FarmerForgotPassword";
import AddProduct from "../Pages/AddProduct";
import CartPage from '../Pages/CartPage';
import ProductDetails from '../Pages/ProductDetails';
import ProductListByType from '../Pages/ProductListByType';
import Contact from "../Pages/Contact";
import Checkout from "../Pages/Checkout"
const AllRoutes = () => {
  return (
    <Routes>
      <Route  path="/" element={<LandingPage/>}></Route>
      <Route path="/login/farmer" element={<LoginFarmerPage/>}></Route>
      <Route path="/login/admin" element={<LoginAdminPage/>}></Route>
      <Route path="/login/vendor" element={<LoginVendorPage/>}></Route>
      <Route path="/signup/farmer" element={<SignupFarmerPage/>}></Route>
      <Route path="/signup/vendor" element={<SignupVendorPage/>}></Route>
      <Route path="/farmer/products/:farmerId" element={<Productuserpage/>}></Route>
      <Route path="/forgot-password" element={<FarmerForgotPassword/>}></Route>
      <Route path="/vendor/dashboard/:vendorID" element={<Productvendorpage/>}></Route>
      <Route path="/vendor/addproduct/:vendorID" element={<AddProduct/>}></Route>
      <Route path='/cart/:farmerId' element={<CartPage/>}></Route> 
      <Route path="/farmer/products/:farmerId/:type/:id" element={<ProductDetails/>}></Route>
      <Route path="/farmer/products/:farmerId/:type" element={<ProductListByType/>}></Route>
      <Route path="/contactus" element={<Contact />} ></Route>
      <Route path="/Checkout" element={<Checkout/>}>   </Route>
    </Routes>
  );
};

export default AllRoutes;
