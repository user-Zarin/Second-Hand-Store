import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Productslide from "../components/Productslide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartOutlined } from "@material-ui/icons";
import axios from "axios";
import {UserContext} from "../context/User.jsx";

const Product = () => {
  const [product, setProduct] = useState({}); 
  const { id } = useParams();
  const location = useLocation();
  const productId = id || location.state?.no; 
  const [seller, setSeller] = useState({});
  const [showPopup, setShowPopup] = useState(false); 
  const {input} = useContext(UserContext)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/api/product/${productId}`);
        if (response.data.product.length > 0) {
          setProduct(response.data.product[0]);
          console.log("Fetched Product:", response.data.product[0]);
        }
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    if (product.seller_id) {
      const getSeller = async () => {
        try {
          const response = await axios.get(`http://localhost:3300/user/${product.seller_id}`);
  
          setSeller(response.data[0]);
        } catch (error) {
          console.log("Error fetching seller:", error);
          setSeller({ address: "Error fetching seller details" }); // Handle errors gracefully
        }
      };
  
      getSeller();
    }
  }, [product.seller_id]); // Ensure it runs when `product.seller_id` is available
  

  const handleBuyNow = async (p_id, seller_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3300/api/order_detail/${p_id}`,
        { seller_id },
        { withCredentials: true }
      );
      console.log("Order Response:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShowPopup(true); // Show popup if user is not logged in
      }
      console.log("Error placing order:", error);
    }
  };

  // Ensure images are parsed properly
  let images = [];
  try {
    images = typeof product.image === "string" ? JSON.parse(product.image) : product.image || [];
  } catch (error) {
    console.error("Error parsing images:", error);
  }


  return (
    <>
      <Header />
      <div className="flex flex-row max-md:flex-col w-[95vw] gap-6 md:m-8 rounded-lg shadow-2xl shadow-blue-500 mb-36">
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50">
          <div className="relative bg-red-400 text-center text-white p-6 rounded-lg shadow-lg w-96">
            {/* Close Button in Upper Right Corner */}
            <button
              className="absolute top-2 right-2 text-white text-xl font-bold bg-transparent hover:text-gray-200"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            <p className="mb-4">You are not logged in. Please log in to continue.</p>
          </div>
        </div>
      )}
        <Productslide images={images} />
        <div className="p-6 w-full h-full">
          <h2 className="text-4xl font-semibold mb-8">{product.p_name || "Product Name"}</h2>
          <p className="mb-8">{product.p_desc || "Product description not available."}</p>
          <div className="border-y-2 border-solid border-slate-300">
            <p className="font-bold text-lg pt-6">Used duration</p>
            <p className="mb-8">{product.used_duration || "Not specified"}</p>
          </div>
          <div className="border-b-2 border-solid border-slate-300 mb-4">
            <p className="font-bold text-lg pt-3">Posted By</p>
            <p className="mb-8">{seller.name || "Location not available"}</p>
          </div>
          <div className="border-b-2 border-solid border-slate-300 mb-4">
            <p className="font-bold text-lg pt-3">Seller Location</p>
            <p className="mb-8">{seller.address || "Location not available"}</p>
          </div>
          <p className="mb-14 text-2xl font-bold">
            <FontAwesomeIcon icon={faIndianRupeeSign} /> {product.price || "999"}
          </p>
          <div className="flex flex-row">
            <button
              className="w-[20vw] h-11 mr-4 mb-6 cursor-pointer"
              style={{
                borderWidth: "4px",
                borderRadius: "12px",
                borderImageSlice: "1",
                borderImageSource:
                  "linear-gradient(90deg, rgba(11,205,220,1) 0%, rgba(44,108,223,1) 100%)",
              }}
            >
              <ShoppingCartOutlined /> Add to cart
            </button>
            <Link to={input ? `/payment/${product.id}/${product.seller_id}` : `/`}>
              <button 
                className="w-[20vw] h-11 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold cursor-pointer"
                onClick={(e) => {
                  handleBuyNow(product.id, product.seller_id);
                }}
              >
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
