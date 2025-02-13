import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AddCategory = ({ onClose }) => {
  const popupRef = useRef();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    alert("Added successfully");
    onClose();
  };

  const handleClosePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log(file);
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col  items-center font-sans">
      <form
        ref={popupRef}
        onClick={handleClosePopup}
        className="bg-white p-6 rounded shadow-md w-full mt-[20vh] items-center max-w-sm"
        onSubmit={handleSubmit}
      >
        <button
          onClick={onClose}
          className=" bg-gray-100 rounded-b-full hover:text-gray-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="mb-4">
          <label className="mb-2">Category Id:</label>
          <input
            type="text"
            className="bg-[#eaecee] rounded-lg h-14 w-[90%] mb-7"
          />
          <label className="mb-2">Category name:</label>
          <input
            type="text"
            className="bg-[#eaecee] rounded-lg h-14 w-[90%] mb-7"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            Choose Image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </form>

      <Link to={"/dashboard/admin"}>
        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-40 h-11 mt-8 mb-9 rounded-lg font-semibold cursor-pointer"
          onClick={handleClick}
        >
          {" "}
          ADD{" "}
        </button>
      </Link>
    </div>
  );
};

export default AddCategory;
