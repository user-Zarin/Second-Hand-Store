import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Productslide from "../components/Productslide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartOutlined } from "@material-ui/icons";

const Product = () => {
  const images = [
    "https://m.media-amazon.com/images/I/71YZwR-ykEL._SY522_.jpg",
    "https://m.media-amazon.com/images/I/61Bhf8CdaML._SY522_.jpg",
    "https://m.media-amazon.com/images/I/81F90H7hnML._SY522_.jpg",
    "https://m.media-amazon.com/images/I/61M6KzUbf7L._SY522_.jpg",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-center flex-grow p-6 gap-8">
        <Productslide images={images} />
        <div className="w-full md:w-[40vw] p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-4xl font-semibold mb-4">Atomic Habit</h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            quaerat molestiae nam, autem debitis est laudantium cupiditate,
            rerum minima odio dolorem dolorum suscipit accusantium velit
            doloremque magni deserunt fuga dolore?
          </p>
          <div className="border-y-2 border-solid border-slate-300 py-4">
            <p className="font-bold text-lg">Used Duration</p>
            <p>Less than 6 Months</p>
          </div>
          <div className="border-b-2 border-solid border-slate-300 py-4 mb-4">
            <p className="font-bold text-lg">Posted in</p>
            <p>Mukundnagar, Nagar, Ahmadnagar, Maharashtra - 414001</p>
          </div>
          <p className="mb-14 text-2xl font-bold">
            <FontAwesomeIcon icon={faIndianRupeeSign} />
            Rs.999
          </p>
          <div className="flex flex-row gap-4">
            <button
              className="flex-1 h-11 mb-6 border-4 rounded-xl text-black"
              style={{
                borderImageSlice: "1",
                borderImageSource:
                  "linear-gradient(90deg, rgba(11,205,220,1) 0%, rgba(44,108,223,1) 100%)",
              }}
            >
              <ShoppingCartOutlined /> Add to cart
            </button>
            <Link to={"/payment"}>
              <button className="flex-1 h-11 bg-cyan-500 rounded-xl hover:bg-cyan-600 text-white">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
