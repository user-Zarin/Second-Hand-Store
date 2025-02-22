import React, { useContext, useState } from "react";
import UserInfo from "../components/UserInfo.jsx";
import Posts from "../components/Posts.jsx";
import { UserContext } from "../context/User";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { data, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { input } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await axios.get('http://localhost:3300/auth/logout',{
        withCredentials: true
      });
      if (res.data.Status) {
        localStorage.removeItem("valid")
        navigate('/login')
      }
    }
    catch (err) {
      setErr(err.response?.data || "An error occurred");
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
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
              <h1 className="text-xl font-bold text-gray-800">{input?.name || "User Name"}</h1>
              <p className="text-gray-600">{input?.email || "user@example.com"}</p>
            </div>
            {/* Editable Section */}
            <UserInfo />
            <Posts />
            <div className="text-center">
              <NavLink to="/history">
                <button className="text-white font-bold bg-red-500 hover:bg-red-700 border-2 border-red-500 rounded-lg p-2 px-4 m-3 transition duration-200">
                  View History
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 h-10 w-40 rounded-3xl mb-12 " onClick={handleClick}>
          logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
