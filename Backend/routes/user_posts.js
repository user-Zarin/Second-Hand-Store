import express from "express";
import { addPosts ,getPosts,updatePosts,deletePosts} from "../controllers/user_post.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/",upload.array("image", 5),addPosts);
router.post("/",getPosts);
router.post("/:id",updatePosts);
router.post("/:id",deletePosts);

export default router;