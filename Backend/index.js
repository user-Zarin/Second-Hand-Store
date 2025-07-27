import express from "express";
import cors from 'cors';
import db  from "./connect.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import path from "path";
import categoryRoutes from "./routes/category.js";
import cartRoutes from "./routes/cartRoute.js";
import postRoutes from "./routes/user_posts.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/order_details.js";
import cookieParser from 'cookie-parser'
const port = 3300;

const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use('/user', userRoutes);
app.use('/auth', authRoutes)
app.use('/api/category', categoryRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/post',postRoutes)
app.use('/api/product',productRoutes)
app.use('/api/order_detail',orderRoutes)


app.get('/',(req,res)=>{
    res.send("second hand store")
}
)

app.listen(port, () => {
    console.log("App listening on port", port);
});
