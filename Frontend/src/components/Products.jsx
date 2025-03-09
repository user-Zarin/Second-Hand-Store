import React, { useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";

const Products = ({ category }) => {
  const [favourites, setFavourites] = useState(Array(8).fill(false)); // Array to track favourites for each product

  const handleFavourite = (index) => {
    setFavourites((prevFavourites) =>
      prevFavourites.map((fav, i) => (i === index ? !fav : fav))
    );
  };

  return (
    <div className="w-full md:w-3/4 p-4">
      <h2 className="text-xl font-semibold mb-4">{category}</h2>
      <div className="flex flex-wrap md:flex-row flex-col gap-5 justify-center overflow-hidden ">
        {[...Array(8)].map((_, index) => (
          
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 border md:p-[3px] p-1 m-4 rounded-md shadow hover:shadow-lg transition hover:scale-105" key={index}>
            <div className="w-full md:w-[20vw] hover:cursor-pointer flex md:flex-col self-center">
            <Link to={'/product'}>
            <img
              src={"https://via.placeholder.com/150"}
              alt={`Product ${index + 1}`}
              className="md:w-full rounded md:h-[35vh] object-cover h-[20vh] w-[35%] self-center "
            />
</Link>
            <div className="info md:px-3 md:m-0 p-5 w-full flex flex-col bg-white">
              <h3 className="font-medium text-lg mb-2">Product {index + 1}</h3>
              <p className="text-gray-500">Rs 999</p>
                <div className="mt-2 text-white p-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded hover:bg-transparent hover:p-0 my-2">
                  <button className="hover:bg-transparent bg-white text-black w-full rounded py-1 font-semibold hover:text-white hover:py-[0.35rem]">Add to Cart</button>
                </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

