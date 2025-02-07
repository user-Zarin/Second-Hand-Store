import express from "express"
import {db} from "./connect.js"
const port = 3000

const app = express()

app.get('/', (req, res) => {
    res.send('Second Hand Hub')
})  

app.listen(port,(req,res)=>{
    console.log("App listening on port ",port)
})