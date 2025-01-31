import React from 'react'
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import GroupIcon from '@material-ui/icons/Group';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CategoriesApi from "../componentApi/CategoriesApi.js";

const Admin = () => {
    const navigate = useNavigate()
    const items = 2
    const colors = ['bg-blue-300','bg-green-300','bg-slate-300','bg-yellow-500','bg-orange-300','bg-red-500']
  return (
    <div className="bg-yellow-500 w-full h-[100vh] flex">
      <div className="one bg-slate-500 w-full md:sticky max-h-fit top-0 md:max-h-screen h-screen overflow-y-auto md:w-1/5 border-0 p-2 text-blue-950 font-bold text-2xl flex flex-col">
        <img src={logo} alt="logo" className="w-[180px]" />

        <div className="flex flex-col justify-between h-full p-3">
          <div>
            <h1 onClick={navigate()} className="my-3 hover:bg-slate-400 cursor-pointer py-2 px-1 rounded-md flex items-center gap-2">
            <GroupIcon/> Users
          </h1>
          <h1 onClick={navigate()} className="my-3 hover:bg-slate-400 cursor-pointer py-2 px-1 rounded-md  flex items-center gap-2">
            <TrendingUpIcon/>Progress
          </h1>
          <h1 onClick={navigate()} className="my-3 hover:bg-slate-400 cursor-pointer py-2 px-1 rounded-md flex items-center gap-2">
          <AddBoxIcon/>Add Category
          </h1>
          </div>
          <div className="">
            <button className="bg-red-600 px-3 py-2 rounded text-white font-semibold hover:bg-red-400 cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="two bg-slate-300 w-4/5">
        <div className='flex flex-wrap md:justify-around p-5'>
        {CategoriesApi.map((item) => (
            <div className={`flex min-w-fit w-72 h-36 left-0 top-0 shadow-lg justify-around m-5 p-3 rounded-md transition hover:scale-105 flex-col ${colors[Math.floor(Math.random() * colors.length)]} `}>
              <h2 className=" text-black font-bold bottom-20 text-[30px]">
                {item.title}
              </h2>
              <h1 className='text-2xl'>Items: {items}</h1>
          </div>
        ))}
        <div className="flex justify-center w-72 h-36 bg-pink-500 shadow-lg m-5 rounded-md transition hover:scale-105 text-white items-center gap-8 text-2xl font-bold">
            <span className=' text-9xl pb-7' >+</span> Add Category
        </div>
        </div>
      </div>
    </div>
  );
}

export default Admin
