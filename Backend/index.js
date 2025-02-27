import express from "express"
import db from "./connect.js"
const port = 3300
import categoryRoutes from "./routes/category.js";
import cartRoutes from "./routes/cartRoute.js";
import postRoutes from "./routes/user_posts.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use("./middleware/uploads", express.static("uploads"));


app.use('/api/category', categoryRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/post',postRoutes)

app.get('/',(req,res)=>{
    res.send("second hand store")
}
)

app.listen(port, () => {
    console.log("App listening on port", port);
});
