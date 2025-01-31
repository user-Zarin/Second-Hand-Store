import React from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Policy from "../components/Policy";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Slider />
      <Categories />
      <Policy />
      <Footer />
    </>
  );
};

export default Home;
