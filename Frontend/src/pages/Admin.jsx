import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import CategoriesApi from "../componentApi/CategoriesApi.js";

import AddCategory from "../components/AddCategory.jsx";
import { faL } from "@fortawesome/free-solid-svg-icons";
const Admin = () => {
  const navigate = useNavigate();
  const items = 2;
  const colors = [
    "bg-blue-300",
    "bg-green-300",
    "bg-slate-300",
    "bg-yellow-500",
    "bg-orange-300",
    "bg-red-500",
  ];
  const [showPopup,setShowPopup]=useState(false);
  return (
    <div className=" bg-slate-300 flex flex-row ">
      
      <div className="flex flex-wrap md:justify-around p-5">
        {CategoriesApi.map((item) => (
          <div
            className={`flex min-w-fit w-72 h-36 left-0 top-0 shadow-lg justify-around m-5 p-3 
            rounded-md transition hover:scale-105 flex-col ${
              colors[Math.floor(Math.random() * colors.length)]
            } `}
          >
            <h2 className=" text-black font-bold bottom-20 text-[30px]">
              {item.title}
            </h2>
            <h1 className="text-2xl">Items: {items}</h1>
          </div>
        ))}
        
        <button 
          className="flex justify-center w-72 h-36 bg-pink-500 shadow-lg m-5 rounded-md transition hover:scale-105
         text-white items-center gap-8 text-2xl font-bold" onClick={()=> setShowPopup(true)}
        >
          <span className=" text-9xl pb-7">+</span> Add Category
        </button>
      {showPopup && <AddCategory onClose={()=>setShowPopup(false)}/> }
        
      </div>
    </div>
  );
};

export default Admin;
