import mongoose from "mongoose";

const connectDB= async ()=>{
    try{
        const mongoUri = process.env.MONGO_URI as string;

        if(!mongoUri){
            throw new Error("MONGO_URI not defined");
        }
        console.log("MONGO_URI: ",mongoUri);
        await mongoose.connect(mongoUri);

        console.log("MongoDB connected successfully");
    }catch (error){
        console.error("MongoDb connection failed", error);
        process.exit(1);
    }
};

export default connectDB;