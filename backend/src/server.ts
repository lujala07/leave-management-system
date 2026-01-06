import express, {Application} from "express";
const app: Application = express();
const PORT= 5000;

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Leave Management System API is running.");
});

app.listen(PORT,()=>{
    console.log(`Server running in http://localhost:${PORT}`);
})