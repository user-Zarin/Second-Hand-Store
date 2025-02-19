import Express from "express";
import postRoutes from "./routes/user_posts.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const port = 3000

// Middlewares
const app = Express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/posts", postRoutes);

app.get('/', (req, res) => {
    res.send('Second Hand Hub')
})  

// Backend config
app.listen(port,(req,res)=>{
    console.log("App listening on port ",port)
})