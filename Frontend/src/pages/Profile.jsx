import React, { useContext, useState } from "react";
import UserInfo from "../components/UserInfo.jsx";
import Posts from "../components/Posts.jsx";
import { UserContext } from "../context/User";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { input, setInput, uploadProfilePhoto } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
  const fileInputRef = React.useRef(null);

  const handleClick = async () => {
    try {
      const res = await axios.get('http://localhost:3300/auth/logout', {
        withCredentials: true
      });
      if (res.data.Status) {
        localStorage.removeItem("user");
        navigate('/login');
      }
    } catch (err) {
      setErr(err.response?.data || "An error occurred");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Preview the image
      handleUploadPhoto(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUploadPhoto = async (selectedFile) => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    await uploadProfilePhoto(input.id, selectedFile);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white mb-[10%] shadow-lg rounded-lg overflow-hidden w-full max-w-4xl m-10">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-40" />
          <div className="relative -mt-20 px-6">
            <div className=" flex justify-center ">
              {input?.profile_photo || previewUrl ? (
                <>
                <div className="flex-col ">
                  <img 
                    src={previewUrl || input.profile_photo} 
                    alt="Profile" 
                    style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom:"5px", marginLeft:"6px" }} 
                  />
                  <button onClick={triggerFileInput} className="ml-4 px-3 py-1 h-7 w-34 bg-cyan-500 rounded-lg">
                    Edit Photo
                  </button>
                  </div>
                </>
              ) : (
                <button onClick={triggerFileInput} className="border-2 border-dashed border-black w-28 h-24 rounded-lg flex flex-col items-center justify-center">
                  <FontAwesomeIcon icon={faCamera} />
                  <p>Upload Photo</p>
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
            <div className="text-center mt-6">
              <h1 className="text-xl font-bold text-gray-800">{input?.name || "User Name"}</h1>
              <p className="text-gray-600">{input?.email || "user@example.com"}</p>
            </div>
            <UserInfo />
            <Posts />
            <div className="text-center">
              <NavLink to="/history">
                <button className="text-white font-bold bg-red-500 hover:bg-red-700 border-2 border-red-500 rounded-lg p-2 px-4 m-3 transition duration-200">
                  View History
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 h-10 w-40 rounded-3xl mb-12" onClick={handleClick}>
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
