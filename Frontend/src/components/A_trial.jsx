import { useState } from "react";
import React from "react";
import { Link } from "react-scroll";
const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 shadow-md">
      <ul className="flex justify-center space-x-6">
        <li><Link to="home" smooth={true} duration={500} className="hover:underline cursor-pointer">Home</Link></li>
        <li><Link to="about" smooth={true} duration={500} className="hover:underline cursor-pointer">About</Link></li>
        <li><Link to="services" smooth={true} duration={500} className="hover:underline cursor-pointer">Services</Link></li>
        <li><Link to="contact" smooth={true} duration={500} className="hover:underline cursor-pointer">Contact</Link></li>
      </ul>
    </nav>
  );
};
const A_trial = () => {
  return (
    <div className="pt-16">
      <Navbar />

      <section id="home" className="h-screen flex items-center justify-center bg-gray-200">
        <h1 className="text-3xl font-bold">Home Section</h1>
      </section>

      <section id="about" className="h-screen flex items-center justify-center bg-gray-300">
        <h1 className="text-3xl font-bold">About Section</h1>
      </section>

      <section id="services" className="h-screen flex items-center justify-center bg-gray-400">
        <h1 className="text-3xl font-bold">Services Section</h1>
      </section>

      <section id="contact" className="h-screen flex items-center justify-center bg-gray-500">
        <h1 className="text-3xl font-bold">Contact Section</h1>
      </section>
    </div>
  );
};

export default A_trial;
