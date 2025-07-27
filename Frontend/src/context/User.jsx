import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [input, setInput] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  });

  const login = async (inputs) => {
    try {
      const res = await axios.post("https://second-hand-store-production-064f.up.railway.app/auth/login", inputs, {
        withCredentials: true,
      });
      console.log("Login Response:", res.data);
      if (res.data.Status === "Success" && res.data.user) {
        setInput(res.data.user); 
        alert("Login successfully");
        return { success: true, user: res.data.user };
      } else {
        alert("Invalid user data received");
        return { success: false}
        
      }
    } catch (error) {
      alert("Invalid user data received");
      
      return { success: false}
    }
  };
  
  const updateProfile = async (userId, updatedData) => {
    
    const res = await axios.put(`http://second-hand-store-production.up.railway.app/user/update/${userId}`, updatedData, {
      
      withCredentials: true,
    });
    if (res.status === 200) {
      setInput(updatedData);
      alert("Profile updated successfully");
    } else {
      alert("Failed to update profile");
    }
  };
  const uploadProfilePhoto = async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append("profile_photo", file);

      const res = await axios.post(`http://second-hand-store-production.up.railway.app/user/upload/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        setInput((prevInput) => ({ ...prevInput, profile_photo: res.data.fileUrl }));
        alert("Profile photo uploaded successfully!");
      } else {
        alert("Failed to upload profile photo.");
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      alert("An error occurred while uploading the profile photo.");
    }
  };
  useEffect(() => {
    console.log("Input State Updated:", input); // Log the input state
    if (input) {
      localStorage.setItem("user", JSON.stringify(input));
     
    } else {
      localStorage.removeItem("user");
    }
  }, [input]);

  return (
    <UserContext.Provider value={{ input, setInput, login,updateProfile ,uploadProfilePhoto}}>
      {children}
    </UserContext.Provider>
  );
};