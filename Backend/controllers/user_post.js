import moment from "moment";
import db from "../connect.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv"
dotenv.config()
export const addPosts = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in !");
  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    const { p_name, p_desc, used_duration, category, price } = req.body;

    if (!p_name || !p_desc || !used_duration || !category || !price) {
      console.error("Validation Error: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log(userInfo.id);
    const userId = userInfo.id;
    const images = req.files ? req.files.map((file) => file.filename) : [];

    try {
      // Fetch category ID
      const q1 = `SELECT id FROM category WHERE cat_name = ?`;
      db.query(q1, [category], (err, categoryResult) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (categoryResult.length === 0) {
          return res.status(400).json({ error: "Invalid category name" });
        }

        const c_id = categoryResult[0].id;
        const imagePaths = JSON.stringify(images);

        // Insert product into database
        const q2 = `INSERT INTO product (c_id, p_name, p_desc, used_duration, price, image, seller_id, posting_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
          c_id,
          p_name,
          p_desc,
          used_duration,
          price,
          imagePaths,
          userId,
          moment().format("YYYY-MM-DD"),
        ];

        db.query(q2, values, (err, insertResult) => {
          if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database operation failed" });
          }

          res.status(200).json({
            message: "Post has been created successfully!",
            postId: insertResult.insertId,
            images: imagePaths,
          });
        });
      });
    } catch (err) {
      console.error("Unexpected Error:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
};

export const getPosts = async (req, res) => {
  // Temporary user ID
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in !");
  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    const userId = userInfo.id;

    const q = `SELECT id,p_name, image, posting_date FROM product WHERE seller_id = (?)`;

    db.query(q, [userId], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ posts: result });
    });
  });
};

export const updatePosts = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in !");
  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    const postId = req.params.id;
    console.log("Post ID received for update:", postId);

    const { p_name, p_desc, used_duration, category, price } = req.body;

    if (!p_name || !p_desc || !used_duration || !category || !price) {
      console.error("Validation Error: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const images = req.files ? req.files.map((file) => file.filename) : [];
    const userId = userInfo.id; // Temporary user ID
    if (!userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    try {
      // Fetch category ID
      const q1 = `SELECT id FROM category WHERE cat_name = ?`;
      db.query(q1, [category], (err, categoryResult) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (categoryResult.length === 0) {
          return res.status(400).json({ error: "Invalid category name" });
        }

        const c_id = categoryResult[0].id;
        const imagePaths = JSON.stringify(images);

        // Corrected UPDATE SQL statement
        const q2 = `
        UPDATE product 
        SET c_id = ?, p_name = ?, p_desc = ?, used_duration = ?, price = ?, image = ?, seller_id = ?, posting_date = ? 
        WHERE id = ?
      `;

        const values = [
          c_id,
          p_name,
          p_desc,
          used_duration,
          price,
          imagePaths,
          userId,
          moment().format("YYYY-MM-DD"),
          postId, // Place postId at the end
        ];

        db.query(q2, values, (err, updateResult) => {
          if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database operation failed" });
          }

          res.status(200).json({
            message: "Post has been updated successfully!",
            postId: postId,
            images: imagePaths,
          });
        });
      });
    } catch (err) {
      console.error("Unexpected Error:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
};

export const deletePosts = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: "Not logged in!" });

    // Verify token
    const userInfo = jwt.verify(token, process.env.SECRET_KEY);
    if (!userInfo) return res.status(403).json({ error: "Invalid token!" });

    const postId = req.params.id;

    // Promisify DB Queries
    const query = promisify(db.query).bind(db);

    // Delete related records first
    await query(`DELETE FROM order_detail WHERE p_id = ?`, [postId]);

    // Delete the main record
    const result = await query(`DELETE FROM product WHERE id = ?`, [postId]);

    // Check if a row was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Post not found!" });
    }

    res.status(200).json({ message: "Post deleted successfully!" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};