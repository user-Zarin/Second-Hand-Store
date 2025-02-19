import React from "react";
import logo from "../assets/logo.png";
import secondhand from "../assets/secondhand.png"
import {
  Search,
  ShoppingCartOutlined,
  AccountCircle,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  const style = "text-3xl, cursor-pointer, ml-[25px] mobile:ml-[5px]";
  return (
    <>
      <div className="sticky top-0 z-50 bg-blue-950 shadow-md ">
        <div className="wrapper pr-[10px] flex justify-between items-center mobile:pl-0 mobile:pr-0">
          <div className="w-[200px] m-3 pl-2">
            <NavLink to="/">
              <img src={secondhand} alt="logo" className="" />
            </NavLink>
          </div>

          {/* <div className="sticky top-0 w-full z-50 bg-white shadow-md "> */}
          {/* <div className="wrapper pr-[10px] flex justify-between items-center mobile:pl-0 mobile:pr-0">
              <div className="w-[180px] m-3 pl-4">
                <NavLink to="/">
                  <img src={logo} alt="logo" className="w-[180px]" />
                </NavLink>
              </div>
            </div> */}
          <div className="inline-flex items-center justify-center border border-gray-400 px-5  py-2 my-5 mx-3 rounded-3xl w-2/3 sm:w-1/4 ">
            <input
              className="flex-1 outline-none bg-inherit text-sm text-white border-blue-400 shadow-white  "
              type="text"
              placeholder="search..."
            />
            <Search className="text-white" />
          </div>

          <div className="flex pt-3">
            <div className="hidden sm:flex text-xl pt-2 mr-3 font-bold text-white">
              <NavLink className={style}>
                <p>Home</p>
              </NavLink>
            </div>
            <div className="hidden sm:flex text-xl pt-2 mr-3 font-bold text-white">
              <NavLink className={style}>
                <p>Categories</p>
              </NavLink>
            </div>
            <div className="hidden sm:flex text-xl pt-2 mr-3 font-bold text-white">
              <NavLink className={style}>
                <p>About us</p>
              </NavLink>
            </div>

            <div className="hidden sm:flex mr-3 ml-3 pt-2 font-bold text-black">
              <NavLink className={style} to="/addtocart">
                <ShoppingCartOutlined className="text-white" />
              </NavLink>
            </div>

            <div className="hidden sm:flex mr-3 pt-2 font-bold text-black">
              <NavLink className={style} to="/profile">
                <AccountCircle className="text-white" />
              </NavLink>
            </div>

            <div className="hidden sm:flex text-xl mr-3  font-bold ">
              <NavLink className={style} to="/sell">
                <button className=" bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] rounded-lg text-white pl-4 pt-2 pb-2 pr-4  w-20 h-11 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
                  Sell
                </button>
              </NavLink>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
