import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
const Productslide = ({ images }) => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const handlePrevious = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="relative w-full h-full overflow-hidden pt-20 ">
      <div className="w-3/4 h-1/2 flex justify-center pl-12">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100 shadow-lg" : "opacity-0"
            }`}
            style={{
              position: index === currentIndex ? "absolute" : "static",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundSize: "100%",
            }}
          />
        ))}
      </div>
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Productslide;
