import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import Categories from "../components/Categories";
import Policy from "../components/Policy";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <Policy />
      <Footer />
    </>
  );
};

export default Home;
