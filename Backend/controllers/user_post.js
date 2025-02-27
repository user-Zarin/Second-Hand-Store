import moment from "moment";
import db from "../connect.js";

export const addPosts = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);

  const { p_name, p_desc, used_duration, category, price } = req.body;

  if (!p_name || !p_desc || !used_duration || !category || !price) {
    console.error("Validation Error: Missing required fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  const userId = 2; // Temporary user ID
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
};

export const getPosts = async (req, res) => {
  
};

export const updatePosts = async (req, res) => {
  
};

export const deletePosts = async (req, res) => {
  
};