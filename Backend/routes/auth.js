import express from "express";
import { login, rsignup, logout } from "../controllers/auths.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", rsignup);
router.get("/logout", logout);

export default router;