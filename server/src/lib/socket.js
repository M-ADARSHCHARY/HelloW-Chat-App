import {Server}from  "socket.io";
import http from "http"; // built in
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express()


const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:[process.env.DEV_MODE ==="development" ? "http://localhost:5173" : process.env.CLIENT_URL],  
    }
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId];
}

// store online users
const userSocketMap = {} //userId : socketId}

io.on("connection",(socket)=>{
    console.log("A user is connected",socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    // emit() is used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
      });
})
export {io , app , server};