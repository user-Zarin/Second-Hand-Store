import express from "express";
import { addOrderDetails, getOrderDetails} from "../controllers/order_detail.js";
const router = express.Router();

router.post("/:p_id",addOrderDetails);
router.get('/orders/:userId',getOrderDetails)

export default router;