import db from "../connect.js";
export const getUser = async (req, res) => {
  // Temporary user ID
  const sellerId = req.params.id;

  const q = `SELECT * from user_info where id = (?)`;
  
  db.query(q, [sellerId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(result);
    res.status(200).json({ userData: result });
  });
};