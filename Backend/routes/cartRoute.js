import express from 'express';
import { addToCart, deleteCartItem, getUserCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.get('/get/:userId', getUserCart);
cartRouter.post('/add/:pid', addToCart);
cartRouter.delete('/delete/:cartItemId',deleteCartItem);

export default cartRouter;
