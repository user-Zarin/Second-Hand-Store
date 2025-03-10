import express from "express";
import { addOrderDetails} from "../controllers/order_detail.js";
const router = express.Router();

router.post("/:p_id",addOrderDetails);


export default router;