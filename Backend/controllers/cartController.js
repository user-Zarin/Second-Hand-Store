import db from "../connect.js";
import jwt from "jsonwebtoken"
// Add products
export const addToCart = async (req, res) => {
    const token = req.cookies.access_token;
      if (!token) return res.status(401).json("Not logged in !");
      jwt.verify(token, "jwtSecretKey", (err, userInfo) => {
   const p_id = req.params.pid;
  console.log("Product ID:", p_id);
   //Temporary user ID
    const userId = userInfo.id;
    
    const q = `INSERT INTO cart (p_id, u_id) VALUES (?, ?)`;
    db.query(q, [p_id, userId], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Product has been added to cart successfully!" });
    });})
};

// Update products in cart
export const updateCart = async (req, res) => {
   
};

// Get user cart data
export const getUserCart = async (req, res) => {
 
};
