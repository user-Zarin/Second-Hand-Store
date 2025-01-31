import React, { useContext, useState } from "react";
import UserInfo from "../components/UserInfo";
import Posts from "../components/Posts";
import { UserContext } from "../context/User";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
function Profile() {
  const { input, setInput } = useContext(UserContext);
  return (
    <>
      <Header />
      <div className="min-h-screen  bg-gray-100 flex justify-center items-center">
        <div className="bg-white mb-[10%] shadow-lg rounded-lg overflow-hidden w-full max-w-4xl m-10">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-40" />
          <div className="relative -mt-20 px-6">
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div className="text-center mt-6">
              <h1 className="text-xl font-bold text-gray-800">{input.name}</h1>
              <p className="text-gray-600">{input.email}</p>
            </div>
            {/* Editable Section */}
            <UserInfo />
            <Posts />
            <NavLink to="/history">
              <button className="text-red-700 font-bold border-2 border-red-500 rounded bg-white p-2 m-3 hover:text-red-500">
                History
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
