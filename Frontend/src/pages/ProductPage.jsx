import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const category = state?.name || "Product";
  const [used, setUsed] = useState("");
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(`http://localhost:3300/api/product/getProducts/${category}`);
        setItems(res.data);
        setFilteredItems(res.data); // Initially, show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getItems();
  }, [category]);

  // Apply filters when `price` or `used` changes
  useEffect(() => {
    let filtered = [...items];

    // Apply price filter
    if (price > 0) {
      filtered = filtered.filter((item) => item.price <= price);
    }

    // Usage duration mapping
    const usageMap = {
      "less-than-6-months": "Less than 6 Months",
      "6-months-1-year": "6 Months - 1 Year",
      "1-year-2-years": "1 Year - 2 Years",
      "2-years-4-years": "2 Years - 4 Years",
      "more-than-4-years": "More than 4 Years",
    };
    
    if (used) {
      filtered = filtered.filter((item) => item.used_duration === usageMap[used]);
    }
    

    // Show all items if no filters are applied
    setFilteredItems(filtered.length ? filtered : items);
  }, [used, price, items]);
  
  const handleCart=async(p_id)=>{
    const response = await axios.post(`http://localhost:3300/api/cart/add/${p_id}`);
    alert("Product has been added to cart successfully!");
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row flex-grow top-10 h-screen">
       {/* Sidebar for Filters */}
      <div className="md:sticky max-h-fit top-0 md:max-h-screen h-screen overflow-y-auto w-full md:w-1/4 bg-gradient-to-r from-cyan-400 to-blue-400 border-0 p-8 text-blue-950 font-semibold">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Used Filter */}
        <div className="my-8">
          <h3 className="font-bold text-lg mb-2">Used</h3>
          <ul>
            {[
              { id: "less-than-6-months", label: "Less than 6 Months" },
              { id: "6-months-1-year", label: "6 Months - 1 Year" },
              { id: "1-year-2-years", label: "1 Year - 2 Years" },
              { id: "2-years-4-years", label: "2 Years - 4 Years" },
              { id: "more-than-4-years", label: "More than 4 Years" },
            ].map((option) => (
              <li key={option.id} className="my-2">
                <input
                  type="radio"
                  name="usage"
                  id={option.id}
                  className="mr-2"
                  checked={used === option.id}
                  onChange={() => setUsed(option.id)}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2 my-8">Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            className="w-full"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>Rs 100</span>
            <span>Rs 5000</span>
          </div>
          <p className="text-center font-semibold mt-2">Selected Price: Rs {price}</p>
        </div>
      </div>

      {/* Product Listing */}
      <div className="w-full md:w-3/4 p-4 overflow-y-auto bg-slate-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-950 text-center">{category}</h2>
        <div className="flex flex-wrap md:flex-row flex-col gap-5 justify-center overflow-hidden">
          {(filteredItems && filteredItems.length > 0) ? (
            filteredItems.map((item, index) => {
              let parsedImage;
                try {
                  if (typeof item.image === "string" && item.image.startsWith("[")) {
                    parsedImage = JSON.parse(item.image);
                  } else {
                    parsedImage = [item.image]; // Treat as a single URL if not JSON
                  }
                } catch (error) {
                  console.error("Error parsing image JSON:", error);
                  parsedImage = [];
}

              return (
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] p-1 m-4 rounded-md shadow hover:shadow-lg transition hover:scale-105"
                  key={index}
                >
                  <div className="w-full md:w-[20vw] hover:cursor-pointer flex md:flex-col self-center">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={`http://localhost:3300/uploads/${parsedImage?.[0]}` || "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={`Product ${index + 1}`}
                        className="md:w-full rounded md:h-[35vh] object-cover h-[20vh] w-[35%] self-center"
                      />
                    </Link>
                    <div className="info md:px-3 md:m-0 p-5 w-full flex flex-col bg-white">
                      <h3 className="font-medium text-lg mb-2">{item.p_name}</h3>
                      <p className="text-gray-500">Rs {item.price}</p>
                      <div className="mt-2 text-white p-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded hover:bg-transparent hover:p-0 my-2">
                        <button className="hover:bg-transparent bg-white text-black w-full rounded py-1 font-semibold hover:text-white hover:py-[0.35rem]" onClick={()=>handleCart(item.id)}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center w-full">
              <h2 className="text-xl font-semibold">No Products Found</h2>
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
