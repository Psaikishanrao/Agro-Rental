// App.js
import React from "react";
import AllRoutes from "./Components/AllRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../src/Components/Navbar";
const App = () => {
  return (
    <div>
      <Navbar/>
        <AllRoutes />
    </div>
  );
};

export default App;
