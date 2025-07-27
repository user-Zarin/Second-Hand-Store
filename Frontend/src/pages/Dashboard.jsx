import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { PhotoAlbum } from "@mui/icons-material";
const DashBoard = () => {
  return (
    <div className="min-h-screen">
      {/*Navbar for recuritment*/}

      {/* <div className="px-5 flex justify-between items-center"> */}
      <div className="sticky top-0 z-50 bg-blue-950  shadow-md ">
        <div className="wrapper pr-[10px] flex justify-between items-center mobile:pl-0 mobile:pr-0">
          <div className="w-[90px] m-3 pl-6">
            <NavLink to="/">
              <img src={logo} alt="logo" className="" />
            </NavLink>
          </div>
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden text-white text-2xl pr-4">welcome</p>

            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-white rounded pt-12">
              <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                <li className="py-1 px-2 cursor-pointer pr-10">Log out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        {/* //left side bar */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-white ${
                  isActive && "bg-yellow-100 border-r-4 border-yellow-600"
                }`
              }
              to={"/dashboard/users"}
            >
              <p className="max-sm:hidden font-bold ">
                <GroupIcon /> User
              </p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-white ${
                  isActive && "bg-yellow-100 border-r-4 border-yellow-600"
                }`
              }
              to={"/dashboard/Admin"}
            >
              <p className="max-sm:hidden font-bold ">
                <PhotoAlbum />
                Admin
              </p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-white ${
                  isActive && "bg-yellow-100 border-r-4 border-yellow-600"
                }`
              }
              to={"/dashboard/progress"}
            >
              <p className="max-sm:hidden font-bold ">
                <TrendingUpIcon />
                Progress
              </p>
            </NavLink>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
