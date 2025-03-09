import { useState } from "react";
import React from "react";

const A_trial = () => {
  const [images, setImages] = useState([]); // Store selected images

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setImages((prevImages) => [...prevImages, ...files]); // Append new images
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Remove image by index
  };

  return (
    <div>
      {/* File Input */}
      <input
        type="file"
        id="file"
        name="file"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
        multiple // Allows multiple file selection
        accept="image/*" // Restrict to image files only
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
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default A_trial;
