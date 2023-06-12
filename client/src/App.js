import React from "react";
import Routing from "./Routing";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IngredientSideBar from "./components/IngredientSideBar";

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/resetpassword" && <Navbar />}
      {location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/resetpassword" && <IngredientSideBar />}
      <Routing />
      {location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/resetpassword" &&
        location.pathname !== "/recipe/new" && <Footer />}
    </>
  );
};

export default App;
