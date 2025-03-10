import express from "express";
import { getUser, updateUser,uploadPhoto } from "../controllers/user.js";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files in 'uploads' folder
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
    },
  });
  const upload = multer({ storage });
router.get("/:id", getUser);
router.put("/update/:id",updateUser);
router.post("/upload/:id",upload.single("profile_photo"), uploadPhoto)
export default router;