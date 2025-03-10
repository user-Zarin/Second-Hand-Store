import moment from "moment";
import db from "../connect.js"; // Ensure correct database connection import
import jwt from "jsonwebtoken";
export const addOrderDetails = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in !");
  jwt.verify(token, "jwtSecretKey", (err, userInfo) => {
    try {
      const pid = req.params.p_id;
      const sellerId = req.body.seller_id;
      const userId = userInfo.id; // Replace '2' with dynamic user ID from authentication

      console.log(
        "Product ID:",
        pid,
        "Seller ID:",
        sellerId,
        "Buyer ID:",
        userId
      );

      if (!sellerId || !pid) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const query =
        "INSERT INTO order_detail (seller_id, buyer_id, p_id, status, date) VALUES (?, ?, ?, ?, ?)";
      const values = [
        sellerId,
        userId,
        pid,
        "Pending",
        moment().format("YYYY-MM-DD"),
      ];

      db.query(query, values, (err, insertResult) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: "Database operation failed" });
        }

        res
          .status(200)
          .json({
            message: "Product ordered successfully!",
            orderId: insertResult.insertId,
          });
      });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
