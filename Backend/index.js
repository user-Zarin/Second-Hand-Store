import express from "express";
import cors from 'cors';
import { db } from "./connect.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import path from "path";
import categoryRoutes from "./routes/category.js";
import cartRoutes from "./routes/cartRoute.js";
import cookieParser from 'cookie-parser';
const app = express();
const port = 3300;

app.use(cors(
    {
        origin:'http://localhost:5173',
        methods:["POST","GET","PUT"],
        credentials:true,

    }
))
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use('/auth', authRoutes);
app.use(express.static('Public'))
app.use(cookieParser())

app.use('/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/cart',cartRoutes)
app.get('/', (req, res) => {
    res.send('Second Hand Hub');
});

app.listen(port, () => {
    console.log("App listening on port", port);
});
