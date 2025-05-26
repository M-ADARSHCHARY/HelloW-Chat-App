import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import {app,io,server} from "./lib/socket.js";
import cors from "cors";


dotenv.config();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));


app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
})) 



/*cors => origin: Only allows requests from your React frontend.
credentials: true: Allows cookies (for sessions or JWT in cookies) to be sent and received.*/ 


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


server.listen(process.env.PORT,(req,res)=>{
    console.log("Server is running on port :",process.env.PORT)
    connectDB();
}) 