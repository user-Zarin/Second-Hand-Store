import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Productslide from "../components/Productslide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartOutlined } from "@material-ui/icons";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState({}); // Initialize as an object
  const { id } = useParams();
  const location = useLocation();
  const productId = id || location.state?.no; // Simplify productId logic

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/api/product/${productId}`);
        setProduct(response.data.product[0]); // Use the first item in the array
        console.log("Fetched Product:", response.data.product[0]);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    getProduct();
  }, [productId]);

  const handleBuyNow = async (p_id, seller_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3300/api/order_detail/${p_id}`,
        { seller_id }, // Send seller_id inside an object
        { withCredentials: true }
      );
      // Handle response if needed
    } catch (err) {
      console.log(err);
    }
  }
  

  // Parse the image field if it's a stringified array
  const images = typeof product.image === "string" ? JSON.parse(product.image) : product.image || [];
  console.log("Images:", images);

  return (
    <>
      <Header />
      <div className="flex flex-row max-md:flex-col w-full gap-6">
        <Productslide images={images} />
        <div className="p-6 w-full h-full">
          <h2 className="text-4xl font-semibold mb-8">{product.p_name || "Product Name"}</h2>
          <p className="mb-8">{product.p_desc || "Product description not available."}</p>
          <div className="border-y-2 border-solid border-slate-300">
            <p className="font-bold text-lg pt-6">Used duration</p>
            <p className="mb-8">{product.used_duration || "Not specified"}</p>
          </div>
          <div className="border-b-2 border-solid border-slate-300 mb-4">
            <p className="font-bold text-lg pt-3">Posted in</p>
            <p className="mb-8">Mukundnagar, Nagar, Ahmadnagar, Maharashtra - 414001</p>
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
            <Link to={`/payment/${product.id}/${product.seller_id}`} className="" >
              <button className="w-[20vw] h-11 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold cursor-pointer" onClick={() => handleBuyNow(product.id,product.seller_id)}>
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