import {
  EmailOutlined,
  Facebook,
  LocalPhoneOutlined,
  LocationOnOutlined,
  Pinterest,
  Twitter,
} from "@material-ui/icons";
import React from "react";
import logo from "../assets/logo.png";
const Footer = () => {
  const socialStyle = "m-3  rounded-full cursor-pointer p-2 text-black";
  return (
    <div className="flex w-full text-black bg-blue-950 border-transparent items-center justify-around p-2 mobile:flex-col mobile:items-start  px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] font-semibold font-sans">
      <div></div>
      <div className="flex-1 flex flex-col flex-wrap p-2">
        <img src={logo} alt="" className="w-[180px]" />
        <p className="text-white"></p>
        <div className="flex items-center justify-center mt-3 self-start">
          <div className={socialStyle}>
            <Facebook />
          </div>
          <div className={socialStyle}>
            <Twitter />
          </div>
          <div className={socialStyle}>
            <Pinterest />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-2">
        <div className="flex m-3">
          <LocationOnOutlined className="" />
          <p className="pl-3 ">location</p>
        </div>
        <div className="flex m-3">
          <LocalPhoneOutlined className="" />
          <p className="pl-3 ">+91 1128000</p>
        </div>
        <div className="flex m-3">
          <EmailOutlined className="" />
          <p className="pl-3 ">secondhandhub@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
