
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs"

export const getUser = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM user_info WHERE id = ?";

  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server side error" });
    }
    console.log(data);
    res.status(200).json(data);
    
  });
};
export const updateUser = (req, res) => {
 
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  
  jwt.verify(token, "jwtSecretKey", (err, userInfo) => {
   
    
    if (err) return res.status(403).json("Token is not valid!");
    
    const userId = req.params.id;
    const { name, address, email, contact, city, pincode } = req.body;
    
    const sql = "UPDATE user_info SET name = ?, address = ?, email = ?, contact = ?, city = ?,pincode = ? WHERE id = ?";
    db.query(sql,[name,address,email,contact,city,pincode,userId],(err,data)=>{
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server side error" });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User profile updated successfully' });
      
    });
  });
};

export const uploadPhoto = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const newFileUrl = `http://localhost:3300/uploads/${req.file.filename}`;
    const userId = req.params.id;

    
    const getOldPhotoQuery = "SELECT profile_photo FROM user_info WHERE id = ?";
    db.query(getOldPhotoQuery, [userId], (err, results) => {
        if (err) {
            console.error("Database error while fetching old photo:", err);
            return res.status(500).json({ message: "Failed to retrieve old profile photo." });
        }

        const oldPhotoUrl = results[0]?.profile_photo;
        if (oldPhotoUrl) {
          
            const oldFileName = path.basename(oldPhotoUrl);
            const oldFilePath = path.join("uploads", oldFileName);

           
            if (fs.existsSync(oldFilePath)) {
                fs.unlink(oldFilePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Error deleting old profile photo:", unlinkErr);
                    }
                });
            }
        }

        const updatePhotoQuery = "UPDATE user_info SET profile_photo = ? WHERE id = ?";
        db.query(updatePhotoQuery, [newFileUrl, userId], (updateErr, result) => {
            if (updateErr) {
                console.error("Database error while updating photo:", updateErr);
                return res.status(500).json({ message: "Failed to update profile photo." });
            }

            res.status(200).json({ 
                message: "Profile photo updated successfully!", 
                profile_photo: newFileUrl 
            });
        });
    });
};