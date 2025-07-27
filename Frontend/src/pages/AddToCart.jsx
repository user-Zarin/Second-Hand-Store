import React, { useEffect, useState } from "react";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../context/User";
import { useContext } from "react";
const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const {input} = useContext(UserContext)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = input.id; // replace with dynamic ID
        
        
        const response = await axios.get(`https://second-hand-store-production.up.railway.app/api/cart/get/${userId}`);
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (cartItemId) => {
    try {
      await axios.delete(`https://second-hand-store-production.up.railway.app/api/cart/delete/${cartItemId}`);
      setCartItems(prev => prev.filter(item => item.cart_id !== cartItemId)); // update UI
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-10 bg-amber-50 m-10 pt-14">
        <div className="text-2xl mb-3">
          <h1 className="font-bold text-3xl text-blue-900">Shopping Cart</h1>
        </div>
        <div>
          {cartItems.length == 0
          ? <h1>No products to display</h1>
          :(cartItems.map((item, index) => {
            let parsedImage;
                  try {
                    if (
                      typeof item.image === "string" && item.image.startsWith("[")
                    ) {
                      parsedImage = JSON.parse(item.image);
                    } else {
                      parsedImage = [item.image]; // Treat as a single URL if not JSON
                    }
                  } catch (error) {
                    console.error("Error parsing image JSON:", error);
                    parsedImage = [];
                  }
                  
            return(
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={`https://second-hand-store-production.up.railway.app/uploads/${parsedImage?.[0]}`} alt="Product" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.p_name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="px-2 sm:px-3 sm:py-1 borderbg-slate-50">
                      Rs. {item.price}
                    </p>
                  </div>
                </div>
              </div>

              <Delete
                className="w-4 cursor-pointer mr-4 sm:w-5"
                onClick={() => handleDelete(item.cart_id)}
              />
            </div>)
          }))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddToCart;