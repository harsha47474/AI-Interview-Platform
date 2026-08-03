import express from 'express'
import 'dotenv'
import connectDB from './config/connectDB.js';

const app = express();
const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.send("This is my new Project. Working on an AI interview platform");
});

app.listen(PORT, ()=>{
    console.log(`Server listening to port ${PORT}`);
    connectDB();
});