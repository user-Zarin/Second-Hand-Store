import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import axios from "axios";

const Sell = () => {
  const popupRef = useRef(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [used_duration, setUsed_duration] = useState("None");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Clothes");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const PostId = location.state?.PostId || 0;

  useEffect(() => {
    if (PostId) {
      handlePostChange();
    }
  }, [PostId]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      alert("Some files exceed the 5MB size limit and were not uploaded.");
    }

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !used_duration || !category || !price || images.length === 0) {
      alert("Please fill out all required fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("p_name", title);
    formData.append("p_desc", desc);
    formData.append("used_duration", used_duration);
    formData.append("category", category);
    formData.append("price", price);

    images.forEach((image) => {
      if (typeof image !== "string") {
        formData.append("image", image);
      }
    });


    try {
      if (PostId === 0) {
        const response = await axios.post(
          "http://localhost:3300/api/post",
          formData,
          { withCredentials: true }
        );
        // console.log(response.data);
        alert("Product has been posted successfully!");
      } else {
        console.log("Post ID:", PostId);
    
        // Log formData for debugging
        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}:`, value);
        // }
    
        const response = await axios.put(
          `http://localhost:3300/api/post/update/${PostId}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
    
        alert("Post has been updated successfully!");
      }
      navigate("/home");
    } catch (error) {
      console.error("Error adding/updating product:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      }
    }
    
  };

  const handlePostChange = async () => {
    if (!PostId) return;
  
    try {
      const response = await axios.get(`http://localhost:3300/api/product/${PostId}`);
      const data = response.data.product[0];
  
      console.log("Fetched Post Data:", data); // Debugging
  
      setTitle(data.p_name || "");  // Ensure key names match backend response
      setDesc(data.p_desc || "");
      setUsed_duration(data.used_duration || "None");
      setCategory(data.category || "Mobile");
      setPrice(data.price || "");
  
      // Handle images properly (if stored as JSON string)
      setImages(data.image ? JSON.parse(data.image) : []);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  


  const on_Hover = "hover:border-2 border-solid border-slate-300";

  return (
    <>
      <Header />
      <div className="flex flex-col items-center font-sans bg-slate-100 py-3">
        <h1 className="text-2xl font-semibold mt-0 mb-6 pt-12 text-blue-900">
          POST YOUR PRODUCT
        </h1>

        <div className="items-start w-11/12 rounded-lg shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] overflow-hidden">
          <div className="flex flex-col items-start pl-9 pt-14 justify-start w-full rounded-lg bg-white overflow-hidden">
            <form
              className="flex flex-col items-start pl-9 pt-14 justify-start w-11/12 rounded-lg bg-white"
              onSubmit={handleSubmit}
              ref={popupRef}
            >
              <label htmlFor="title">Title*</label>
              <input
                id="title"
                type="text"
                className="bg-[#eaecee] rounded-lg h-14 w-1/2 px-2 hover:border-slate-300 hover:border-2 hover:border-solid"
                placeholder="Enter item title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="category" className="mt-7">Category</label>
              <select
                id="category"
                className={`${on_Hover} bg-[#eaecee] mb-7 w-1/2 h-14 rounded-xl`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {[
                  "Clothes",
                  "Cars",
                  "Mobile",
                  "Books",
                  "Pets",
                  "Appliances",
                  "Toys",
                  "Bikes",
                  "Furniture",
                ].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <label htmlFor="used-duration">Used Duration</label>
              <select
                id="used-duration"
                className={`${on_Hover} bg-[#eaecee] mb-7 w-1/2 h-14 rounded-xl`}
                value={used_duration}
                onChange={(e) => setUsed_duration(e.target.value)}
              >
                {[
                  "None",
                  "Less than 6 Months",
                  "6 Months - 1 Year",
                  "1 Year - 2 Years",
                  "2 Years - 4 Years",
                  "More than 4 Years",
                ].map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>

              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                className="mb-7 bg-[#eaecee] rounded-lg h-14 w-1/2 hover:border-slate-300 hover:border-2 hover:border-solid px-2"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                cols={50}
                rows={5}
                className="bg-[#eaecee] rounded-xl p-2"
                placeholder="Include condition, features, and reason for selling px-2"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>

              <input
                type="file"
                id="file"
                name="file"
                className="block w-fit text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 p-3 my-8 "
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />

              <div className="flex flex-wrap gap-3 my-4 ">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                        src={
                          PostId === 0
                            ? typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                            : typeof image === "string"
                            ? `http://localhost:3300/uploads/${image}`
                            : URL.createObjectURL(image)
                        }
                        className="w-28 h-28 rounded-lg border"
                        alt="Preview"
                      />

                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs "
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" disabled={isLoading} className={`${on_Hover} scroll-auto bg-gradient-to-r from-cyan-400 to-blue-500 md:p-[3px] overflow-hidden w-40 h-11 mb-9 rounded-lg font-semibold cursor-pointer text-white`}>
                {PostId === 0 ? "POST" : "UPDATE POST"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sell;
