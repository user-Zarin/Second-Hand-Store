import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ScrollToTop from "./components/ScrollTop/ScrollToTop.jsx";
import Profile from "./pages/Profile.jsx";
import Payment from "./pages/Payment.jsx";
import History from "./pages/History.jsx";
import AddToCart from "./pages/AddToCart.jsx";
import Login from "./pages/Login.jsx";
import SignUP from "./pages/SignUP.jsx";
import Sell from "./pages/Sell.jsx";
import Product from "./pages/Product.jsx";
import Admin from "./pages/Admin.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/signup" element={<SignUP/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sell" element={<Sell/>}/>
        <Route path="/category/:id" element={<ProductPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/history" element={<History />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/product" element={<Product/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
