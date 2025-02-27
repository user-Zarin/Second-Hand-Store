import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Validate number of images
    if (images.length + files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    // Validate image size (e.g., 5MB limit)
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
  
    // Validate required fields on the client side
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
      formData.append("image", image);
    });
  
    // Log formData to inspect the payload
    console.log("Form Data:", formData); 
  
    try {
      const response = await axios.post(
        "http://localhost:3300/api/post",
        formData,
        { withCredentials: true } 
      );
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      }
    }
  };

  return (
    <div className="flex flex-col items-center font-sans bg-[#D6C0B3]">
      <Header />
      <h1 className="text-2xl font-semibold mt-0 mb-6 pt-24">POST YOUR AD</h1>
      <form
        className="flex flex-col items-start pl-9 pt-14 justify-start w-11/12 rounded-lg bg-white"
        onSubmit={handleSubmit}
        ref={popupRef}
      >
        {/* Title */}
        <label htmlFor="title">Title*</label>
        <input
          id="title"
          type="text"
          className="bg-[#eaecee] rounded-lg h-14 w-1/2 p-2"
          placeholder="Enter item title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="text-slate-400 text-sm font-normal mb-7 p-2">
          Mention the key features of your item (e.g., brand, model, type).
        </p>

        {/* Category */}
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="border-2 border-solid mb-7 w-1/2 h-14 rounded-xl"
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

        {/* Used Duration */}
        <label htmlFor="used-duration">Used Duration</label>
        <select
          id="used-duration"
          className="border-2 border-solid mb-7 w-1/2 h-14 rounded-xl"
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

        {/* Price */}
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          className="mb-7 bg-[#eaecee] rounded-lg h-14 w-1/2 p-2"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Description */}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          cols={50}
          rows={5}
          className="bg-[#eaecee] rounded-xl max-sm:w-52 p-2"
          placeholder="Include condition, features, and reason for selling"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        {/* File Input */}
        <div className="my-4">
          <input
            type="file"
            id="file"
            name="file"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 p-3 my-2 "
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Preview Selected Images */}
          <div className="flex flex-wrap gap-3 mt-4">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="w-28 h-28 rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Post Button */}
        <button
          type="submit"
          className="bg-[#4d440a] w-40 h-11 mt-8 mb-9 rounded-lg font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "POST"}
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default Sell;