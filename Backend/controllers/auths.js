import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const saltRounds = 10;
export const login = (req, res) => {
  const sql = `SELECT * FROM user_info WHERE email=?`;
  
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Server side error" });
    }

    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ Message: "Error during password comparison" });
        }
        if (!result) {
          return res.status(400).json({ Message: "Wrong password" });
        }

        const email = data[0].email;
        const token = jwt.sign({ email }, "jwtSecretKey", { expiresIn: "1h" });
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "strict",
        });

        // Include the user object in the response
        const user = {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          contact: data[0].contact || "N/A",
          address: data[0].address || "N/A",
          city: data[0].city || "N/A",
          pincode: data[0].pincode || "N/A",
          profile_photo:data[0].profile_photo
        };
        
        console.log("Login successful");
        return res.json({ Status: "Success", user });
      });
    } else {
      return res.status(404).json({ Message: "No records found" });
    }
  });
};


export const rsignup = (req, res) => {
  console.log("Received Data:", req.body);

  const sql = "INSERT INTO user_info (`name`,`email`,`password`) VALUES (?)";
 
  bcrypt.hash(req.body.password.toString(), saltRounds,(err,hash)=>{
    if(err) return res.json({Error:"error for hashing password"})
      const values = [
        req.body.name,
        req.body.email,
        hash
      ];
      
      db.query(sql,[values], (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } 
        return res.status(201).json("User has been created");
      });
      
  });
 

 
};


export const logout = (req, res) => {
  res.clearCookie("access_token");
  return res.json({Status:true})
};