import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import {app,io,server} from "./lib/socket.js";
import cors from "cors";
import path from "path";


dotenv.config();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
const __dirname = path.resolve();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
})) 

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));
    app.get("/*HelloW", (req, res) => {
        res.sendFile(path.join(__dirname, "../FrontEnd", "dist", "index.html"));
    });
}


/*cors => origin: Only allows requests from your React frontend.
credentials: true: Allows cookies (for sessions or JWT in cookies) to be sent and received.*/ 


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


server.listen(process.env.PORT,(req,res)=>{
    console.log("Server is running on port :",process.env.PORT)
    connectDB();
}) 