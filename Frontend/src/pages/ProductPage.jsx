import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@material-ui/icons";

const ProductPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const category = state?.name || "Product";
  const [used, setUsed] = useState("");
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3300/api/product/getProducts/${category}`
        );
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
      filtered = filtered.filter(
        (item) => item.used_duration === usageMap[used]
      );
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) => {
        const name = item.p_name?.toLowerCase() || "";
        const desc = item.description?.toLowerCase() || "";
        return (
          name.includes(searchTerm.toLowerCase()) ||
          desc.includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredItems(filtered);
  }, [used, price, searchTerm, items]);

  const handleCart = async (p_id) => {
    const response = await axios.post(
      `http://localhost:3300/api/cart/add/${p_id}`
    );
    alert("Product has been added to cart successfully!");
  };

  const SidebarContent = () => {
    return (<div className="md:sticky max-h-screen h-screen overflow-y-auto bg-gradient-to-r from-cyan-400 to-blue-400 border-0 p-8 text-blue-950 font-semibold">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Search Filter */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border-2 border-gray-100 rounded bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
        <p className="text-center font-semibold mt-2">
          Selected Price: Rs {price}
        </p>
      </div>
    </div>)
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row flex-grow top-10 h-screen">
        {/* Sidebar for Filters */}
        <div className="hidden md:block w-1/4">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-74 h-screen bg-gradient-to-r from-cyan-400 to-blue-400 z-50 bg-opacity-50 shadow-lg flex flex-col ">
           <button
            className="flex text-2xl justify-end items-center px-2 transition-transform duration-500 ease-in-out"
            onClick={()=>setIsOpen(false)}
            >
              X
            </button>
          <div className="md:hidden mt-0">
              <SidebarContent />
            </div>
        </div>
        )}
        

          {/* ###### */}

        <div className="flex flex-row w-full overflow-y-auto bg-slate-200">
          <div className="md:hidden h-screen fixed top-23 z-49">
            <button className="bg-yellow-500">
              <MenuOutlined
                className="text-2xl font-bold"
                onClick={() => setIsOpen(true)}
              />
            </button>
          </div>
          {/* Product Listing */}
          <div className="p-4 m-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-950 text-center">
              {category}
            </h2>
            <div className="flex flex-wrap md:flex-row flex-col gap-5 justify-center overflow-hidden">
              {filteredItems && filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
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

                  return (
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] m-4 rounded-md shadow hover:shadow-lg transition hover:scale-105 md:h-[50vh]"
                      key={index}
                    >
                      <div className="w-full md:w-[40vh] hover:cursor-pointer flex md:flex-col m-0 h-full justify-between ">
                        <Link to={`/product/${item.id}`} className="md:w-full w-[50%] flex justify-center md:h-[60%] bg-white items-center max-w-full md:m-0 rounded-l-md">
                          <img
                            src={
                              `http://localhost:3300/uploads/${parsedImage?.[0]}` ||
                              "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt={`Product ${index + 1}`}
                            className="flex md:max-w-full rounded object-cover h-[25vh] md:min-h-fit md:min-w-fit"
                          />
                        </Link>
                        <div className="info md:px-3 md:m-0 p-5 md:w-full w-[50%] flex flex-col ">
                          <h3 className="font-medium text-lg mb-2">
                            {item.p_name}
                          </h3>
                          <p className="text-blue-950 font-semibold">Rs {item.price}</p>
                          <div className="mt-2 text-white p-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded hover:bg-transparent hover:p-0 my-2">
                            <button
                              className="hover:bg-blue-500 bg-white text-black w-full rounded py-1 font-semibold hover:text-white hover:py-[0.35rem] hover:cursor-pointer"
                              onClick={() => handleCart(item.id)}
                            >
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
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
