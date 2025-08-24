import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL } from '../../config';
import { faIndianRupeeSign,faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons';
const Productslide = ({images}) => {
    const[currentIndex,setcurrentIndex]=useState(0);
    const handlePrevious=()=>{
     setcurrentIndex((prevIndex)=>(prevIndex===0?images.length-1:prevIndex-1))
    }
    const handleNext=()=>{
        setcurrentIndex((prevIndex)=>(prevIndex===images.length-1?0:prevIndex+1))
       }

    
  // Fallback image URL
  const fallbackImage =
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

  return (
    
  <div className="relative w-full h-screen overflow-hidden pt-20 p-3 rounded-l-lg">
    <div className="w-3/4 h-1/2 flex justify-center pl-12">
      {images.map((image, index) => (
        <img
          key={index}
          src={`${API_BASE_URL}/uploads/${image}`}
          alt={`Slide ${index}`}
          className={`w-full bg-red-600 h-full object-cover transition-opacity items-center duration-500 ${index === currentIndex ? 'opacity-100 shadow-lg' : 'opacity-0'}`}
          style={{ position: index === currentIndex ? 'absolute' : 'static', top: 0, left: 0, width: '100%', height: '100%',backgroundSize:'100%' }}
          onError={(e) => {
            e.target.src = fallbackImage; // Fallback if the image fails to load
          }}

        />
      ))}
    </div>
    <button onClick={handlePrevious} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2">
      <FontAwesomeIcon icon={faAngleLeft}/>
    </button>
    <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2">
      <FontAwesomeIcon icon={faAngleRight}/>
    </button>
  </div>
);

    
  
}

export default Productslide