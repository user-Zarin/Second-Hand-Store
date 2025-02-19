import express from "express";
import { getCategory, addCategory, deleteCategory } from "../controllers/Category.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.get("/", getCategory);
router.post('/', upload.single('cat_icon'),addCategory);
router.delete("/:id", deleteCategory);

export default router;