import React from "react";
import logo from "../assets/logo.png";
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
      <div className="sticky top-0 w-full z-50 bg-white shadow-md ">
        <div className="wrapper pr-[10px] flex justify-between items-center mobile:pl-0 mobile:pr-0">
          <div className="w-[180px] m-3 pl-4">
            <NavLink to="/">
              <img src={logo} alt="logo" className="w-[180px]" />
            </NavLink>
          </div>

          <div className="inline-flex items-center justify-center border border-gray-400 px-5  py-2 my-5 mx-3 rounded-3xl w-2/3 sm:w-1/4 ">
            <input
              className="flex-1 outline-none bg-inherit text-sm "
              type="text"
              placeholder="search..."
            />
            <Search />
          </div>

          <div className="flex pt-3">
            
          <ul className='hidden sm:flex gap-2 text-m pt-2  font-bold text-black'>
         <NavLink to='/home' className={style}><p>Home</p></NavLink>
         <NavLink className={style}><p>Categories</p></NavLink>
         <NavLink className={style}><p>About us</p></NavLink>
         
        
       </ul>

            <div className="hidden sm:flex mr-3 ml-3 pt-2 font-bold text-black">
              <NavLink className={style} to="/addtocart">
                <ShoppingCartOutlined />
              </NavLink>
            </div>

            <div className="hidden sm:flex mr-3 pt-2 font-bold text-black">
              <NavLink className={style} to="/profile">
                <AccountCircle />
              </NavLink>
            </div>
            <div className="hidden sm:flex text-xl pt-2 ml-3 font-bold text-blue-950 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl w-20 h-11 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
              <NavLink className={style} to={"/sell"}>
                <p>Sell</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
