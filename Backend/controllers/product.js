import db from "../connect.js";

export const getProduct = async (req, res) => {

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

export const getProducts = async (req, res) => {
  const category = req.params.category; // Ensure your route uses `/getProducts/:category`
  console.log("Requested Category:", category);

  const q1 = `SELECT id FROM category WHERE cat_name = ?`;

  db.query(q1, [category], (err, categoryResult) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (categoryResult.length === 0) {
      console.log("Invalid category name");
      return res.status(400).json({ error: "Invalid category name" });
    }

    const c_id = categoryResult[0].id;
    console.log("Category ID:", c_id);

    const q2 = `SELECT id, p_name, used_duration, price, image FROM product WHERE c_id = ? order by posting_date desc`;

    db.query(q2, [c_id], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json(result); // Send array directly for frontend compatibility
    });
  });
};