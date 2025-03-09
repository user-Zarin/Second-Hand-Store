import db from "../connect.js";

export const getProduct = async (req, res) => {
  // Temporary user ID
  const p_id = req.params.id;

  const q = `SELECT * FROM product WHERE id = (?)`;
  
  db.query(q, [p_id], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Fetched Product:", result); 
    res.status(200).json({ product: result });
  });
};