import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";
import leaveRequestRoutes from "./routes/leaveRequest.routes";
import leaveBalanceRoutes from "./routes/leaveBalance.routes";

dotenv.config();

const app = express();
const PORT= process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/leave-requests", leaveRequestRoutes);
app.use("/api/leave-balances", leaveBalanceRoutes);



app.get("/", (req,res)=>{
    res.send("Leave Management System API is running.");
});

app.listen(PORT,()=>{
    console.log(`Server running in http://localhost:${PORT}`);
});