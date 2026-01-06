import express, {Application} from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app: Application = express();
const PORT= process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Leave Management System API is running.");
});

app.listen(PORT,()=>{
    console.log(`Server running in http://localhost:${PORT}`);
});