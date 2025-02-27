import Express from "express";
import postRoutes from "./routes/user_posts.js";
import categoryRoutes from "./routes/category.js";
import cartRoutes from "./routes/cartRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// Middlewares
const port = 3300
const app = Express();
app.use(Express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))
app.use(Express.urlencoded({ extended: true }));
app.use("./middleware/uploads", Express.static("uploads"));


app.use('/api/category', categoryRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/post', postRoutes);

app.get('/',(req,res)=>{
    res.send("second hand store")
}
)

app.listen(port,()=>{
    console.log("App listening on port "+port)
})

