import express from "express";
import cors from 'cors';
import { db } from "./connect.js";
import authRoutes from './routes/auth.js';

const app = express();
const port = 3000;



app.use(cors(
    {
        origin:'http://localhost:5173',
        methods:["POST","GET"],
        credentials:true,

    }
))

app.use(express.json());
app.use('/auth', authRoutes);
app.use(express.static('Public'))

app.get('/', (req, res) => {
    res.send('Second Hand Hub');
});

app.listen(port, () => {
    console.log("App listening on port", port);
});