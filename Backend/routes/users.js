import express from "express";
import { getUser, updateUser,uploadPhoto } from "../controllers/user.js";
import upload from "../middleware/multer.js";
import path from "path";
const router = express.Router();

router.get("/:id", getUser);
router.put("/update/:id",updateUser);
router.post("/upload/:id",upload.single("profile_photo"), uploadPhoto)
export default router;