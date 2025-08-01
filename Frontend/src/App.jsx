import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ScrollToTop from "./components/ScrollTop/ScrollToTop.jsx";
import Profile from "./pages/Profile.jsx";
import Payment from "./pages/Payment.jsx";
import History from "./pages/History.jsx";
import AddToCart from "./pages/AddToCart.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import UserProgress from "./pages/Progress.jsx";
import Login from "./pages/Login.jsx";
import SignUP from "./pages/SignUP.jsx";
import Sell from "./pages/Sell.jsx";
import Product from "./pages/Product.jsx";
import Admin from "./pages/Admin.jsx";
import Users from "./pages/Users.jsx";
import AddCategory from "./components/AddCategory.jsx";
import { UserContext } from './context/User';
import PrivateRoute from "./components/PrivateRoute.jsx";
import A_trial from "./components/A_trial.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

      <Route path="/trial" element={<A_trial />} />

        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup/:id" element={<SignUP />} />
        <Route path="/signup" element={<SignUP/>} />
        <Route path="/login" element={<Login />}  />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/category/:id" element={<ProductPage />} />
        <Route path="/product/:id" element={<Product />} />

        {/* Private Routing on user side*/}

        <Route element={<PrivateRoute/>}>
          <Route path="/sell" element={<Sell />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment/:productId/:sellerId" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/addtocart" element={<AddToCart />} />
        </Route>

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashBoard />}>
        <Route path="Admin" element={<Admin />} /> 
        <Route path="progress" element={<UserProgress />} />
        <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
