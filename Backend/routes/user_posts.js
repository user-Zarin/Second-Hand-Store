import express from "express";
import { addPosts } from "../controllers/user_post.js";

const router = express.Router();

router.post("/", addPosts);

export default router;