import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const saltRounds = 10;
 export const login = (req, res) => {
  const sql = `SELECT * FROM user_info WHERE email=? `;
  
    db.query(sql, [req.body.email], (err, data) => {
     if (err) {
       console.log(err);
       return res.json({ Message: "Server side error" });
     }

     if (data.length > 0) {
     
       bcrypt.compare(req.body.password, data[0].password, (err, result) => {
         if (err) {
           console.log(err);
           return res.json({ Message: "Error during password comparison" });
         }
         if (!result) {
           return res.status(400).json({ Message: "Wrong password" });
         }

         const email = data[0].email;
         const token = jwt.sign({ email }, "jwtSecretKey", { expiresIn: "1d" });
         res.cookie("access_token", token);
         console.log("success");
         return res.json({ Status: "Success" });
         });
       } else {
         return res.json({ Message: "No records found" });
       }
     });
  }


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