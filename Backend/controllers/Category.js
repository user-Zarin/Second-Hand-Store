import db from '../connect.js'
// addCategory functione
export const addCategory = (req, res) => {
  const { id, cat_name } = req.body;
  const cat_icon = req.file ? req.file.filename : null;

  if (!id || !cat_name || !cat_icon) {
    return res.status(400).json({ error: 'Please provide all required fields: id, cat_name, and icon.' });
  }

  const sql = `INSERT INTO category (id, cat_name, cat_icon) VALUES (?, ?, ?)`;
  db.query(sql, [id, cat_name, cat_icon], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      return res.status(500).json({ error: 'Database insertion error' });
    }
    res.status(200).json({  message: 'Category added successfully'})
  });
}


export const getCategory = (req, res) => {
  const sqlSelect = 'SELECT category_id, category_name, category_icon FROM Categories';
  db.query(sqlSelect, (err, rows) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Database fetch error' });
    }

    const categories = rows.map(category => ({
      id: category.category_id,
      name: category.category_name,
      url: `${req.protocol}://${req.get('host')}/uploads/${category.category_icon}`,
    }));

    res.status(200).json({ categories });
  })
}


export const deleteCategory=(req,res)=>{
      const q =
        "DELETE FROM posts WHERE `id`=? ";
  
      db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.affectedRows>0) return res.status(200).json("category deleted.");
        return res.status(403).json("You can delete only your post")
      });
}
  

