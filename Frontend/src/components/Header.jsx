import React, { useState ,useContext} from "react";
import logo from "../assets/logo.png";
import { Link } from "react-scroll";
import secondhand from "../assets/secondhand.png"
import { UserContext } from "../context/User";
import {
  Search,
  ShoppingCartOutlined,
  AccountCircle,
  MenuOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const style = "text-xl cursor-pointer ml-[25px] mobile:ml-[5px]";
  const {input} = useContext(UserContext);
  return (
    <>
      <div className="sticky finxed top-0 z-50 bg-blue-950 shadow-md">
        <div className="wrapper pr-[10px] flex justify-between items-center mobile:pl-0 mobile:pr-0">
          <div className="w-[200px] m-3 pl-2">
            <NavLink to="/home">
              <img src={secondhand} alt="logo" className="" />
            </NavLink>
          </div>

          {/* <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-3xl w-2/3 sm:w-1/4">
            <input
              className="flex-1 outline-none bg-inherit text-sm text-white border-blue-400 shadow-white"
              type="text"
              placeholder="search..."
            />
            <Search className="text-white" />
          </div> */}

          <div className="flex pt-3">
            <div className="hidden sm:flex text-xl pt-2 mr-3 font-bold text-white">
              <NavLink className={style} to={"/home"}>
                <p>Home</p>
              </NavLink>
            </div>
            <div className="hidden sm:flex text-xl pt-2 mr-3 font-bold text-white">
              <NavLink className={style}>
                <Link to="categories" smooth={true} duration={500}>
                  <p>Categories</p>
                </Link>
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
            <div className="hidden sm:flex text-xl pt-2 ml-3 font-bold text-blue-950 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl w-20 h-11 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
              <NavLink className={style} to="/sell">
                <p>Sell</p>
              </NavLink>
            </div>
            {!input && (
              <div className="hidden sm:flex text-l p-2 font-bold rounded-xl w-30 mx-3 h-fit-content transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 border border-cyan-500 text-white items-center">
                <NavLink className={style} to="/login">
                  <p>Login</p>
                </NavLink>
              </div>
            )}
            <div className="sm:hidden flex items-center">
              <MenuOutlined
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-blue-950">
          <div className="flex flex-col p-4">
            <NavLink className={style} to="/">
              Home
            </NavLink>
            <NavLink className={style} to="/categories">
              Categories
            </NavLink>
            <NavLink className={style} to="/about">
              About us
            </NavLink>
            <NavLink className={style} to="/addtocart">
              <ShoppingCartOutlined className="mr-2" /> Add to cart
            </NavLink>
            <NavLink className={style} to="/profile">
              <AccountCircle className="mr-2" /> Profile
            </NavLink>
            <NavLink className={style} to="/sell">
              Sell
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
