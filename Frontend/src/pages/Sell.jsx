import React from 'react'
import { useRef,useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera,faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer.jsx";
import Header from '../components/Header.jsx';
import { Link } from 'react-router-dom'
const Sell = () => {
  
  const inputref1=useRef(null);
  const inputref=useRef(null);
  const handleClick=()=>{
   inputref.current.click();
  }
  const handleClick1=()=>{
    inputref1.current.click();
   }
  const[file,setFile]=useState();
  const[file1,setFile1]=useState();
  const handleChange=(e)=>{
    const file=e.target.files[0];
    setFile(file);
  }
  const handleChange1=(e)=>{
    const file1=e.target.files[0];
    setFile1(file1);
  }
  const onClick=()=>{
    alert("posted sucessfully")
  }
  const on_Hover="hover:border-2  border-solid border-slate-300"
  return (
    <>
    <Header/>
    <div className='flex flex-col items-center font-sans  bg-slate-100'>
      
       <h1 className='text-2xl font-semibold mt-0 mb-6  pt-12 text-blue-900'>POST  YOUR  AD</h1>
       
       

        <div className=' items-start   w-11/12   rounded-lg shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] overflow-hidden'>
        <div className="flex flex-col items-start pl-9 pt-14 justify-start  w-full  rounded-lg bg-white overflow-hidden">
        <label > Title*</label>
        <input type="text"  className='bg-[#eaecee]  rounded-lg h-14 w-1/2 hover:border-slate-300 hover:border-2 hover:border-solid' />
        <p className='text-slate-400 text-sm font-normal mb-7'>Mention the key features of your item (e.g. brand, model, type)</p>
        
        <label > Category</label>
        <select className={on_Hover+" bg-[#eaecee] mb-7 w-1/2 h-14 rounded-xl"} name="" id="">
            <option value="">Cloths</option>
            <option value="">Cars</option>
            <option value="">Mobile</option>
            <option value="">Books</option>
            <option value="">Pets</option>
            <option value="">Appliances</option>
            <option value="">Toys</option>
            <option value="">Bikes</option>
            <option value="">Furniture</option>
        </select>
        
        <label > used duration</label>
        <select className={on_Hover+" bg-[#eaecee] mb-7 w-1/2 h-14 rounded-xl"}  name=""  id="">
        <option value="" selected > none</option>
            <option value="">Less than 6 Months</option>
            <option value="">6 Months - 1 Year</option>
            <option value="">1 Year - 2 Years</option>
            <option value="">2 Years - 4 Years</option>
            <option value="">More than 4 Years</option>
            
        </select>
         <label>Price</label>
        <input type="text" className='mb-7 bg-[#eaecee] rounded-lg h-14 w-1/2 hover:border-slate-300 hover:border-2 hover:border-solid' />

        <label >Description</label>
        <textarea cols={50} rows={5} className='bg-[#eaecee]  rounded-xl max-sm:w-52 hover:border-slate-300 hover:border-2 hover:border-solid'></textarea>
        <p className='text-slate-400 text-sm font-normal mb-7 '>Include condition, features and reason for selling</p>

        
        <div className='flex flex-row gap-3'>
        <button onClick={handleClick} className='border-2 border-dashed border-black w-28 h-24 mb-6 rounded-lg '><FontAwesomeIcon icon={faCamera} /><p>Add Photo</p></button>
        {file? <img src={URL.createObjectURL(file)} className='w-40  h-36'/>:null}
        <input type="file"ref={inputref} className='mb-7 hidden ' onChange={handleChange} />

        <button onClick={handleClick1} className='border-2 border-dashed border-black w-28 h-24 rounded-lg '><FontAwesomeIcon icon={faCamera} /><p>Add Photo</p></button>
        {file1? <img src={URL.createObjectURL(file1)} className='w-40 h-36'/>:null}
        <input type="file"ref={inputref1} className='mb-7 hidden' onChange={handleChange1} />
        </div>
        </div>
        </div>
        <Link to={"/home"}> <button className='scroll-auto bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] overflow-hidden w-40 h-11 mt-8 mb-9 rounded-lg font-semibold' onClick={onClick}>POST</button></Link>
        </div>
    
    <Footer/>
    </>
  )
}

export default Sell