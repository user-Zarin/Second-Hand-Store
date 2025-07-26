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
// Get user cart data
export const getUserCart = async (req, res) => {
  const userId = req.params.userId; // from route like /api/cart/:userId

try {
  db.query(
    `SELECT 
       c.id AS cart_id,
       p.p_name,
       p.price,
       p.image
     FROM cart c
     JOIN product p ON c.p_id = p.id
     WHERE c.u_id = ?`,
    [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(200).json({ cart: results });
    }
  );
} catch (error) {
  console.error('Unexpected error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}


};

export const deleteCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;

  try {
    
    db.query('DELETE FROM cart WHERE id = ?',[cartItemId],(err,result)=>{
       if (err) {
        console.error('Error deleting cart items:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
        res.status(200).json({ message: 'Cart item deleted successfully' });
    })
    
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
