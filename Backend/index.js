import express from "express"
const port = 3300
import categoryRoutes from "./routes/category.js";
import cartRoutes from "./routes/cartRoute.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
app.use(express.json());
app.use(cookieParser())

app.use('/api/category', categoryRoutes);
app.use('/api/cart',cartRoutes)


app.get('/',(req,res)=>{
    res.send("second hand store")
}
)

app.listen(port,()=>{
    console.log("App listening on port "+port)
})

