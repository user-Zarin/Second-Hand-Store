import db from "../connect.js";
// Add products
export const addToCart = async (req, res) => {
   const p_id = req.params.pid;
  console.log("Product ID:", p_id);
   //Temporary user ID
    const userId = 2;
    
    const q = `INSERT INTO cart (p_id, u_id) VALUES (?, ?)`;
    db.query(q, [p_id, userId], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Product has been added to cart successfully!" });
    });
};

// Update products in cart
export const updateCart = async (req, res) => {
   
};

// Get user cart data
export const getUserCart = async (req, res) => {
 
};
