import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import  cloudinary  from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";
import {io} from "../lib/socket.js";

export const getUsersForSideBar = async (req, res) => {
    try{
        // Get all users except the logged in user
        const allUsers = await User.find({_id:{$ne:req.user._id}}).select("-password -__v -createdAt -updatedAt")

        if( allUsers && allUsers.length > 0){
         return res.status(200).json(allUsers);
        } 
        return res.status(404).json({users:[],message:"No users found"});
    }catch(err){
        console.log("Error in getUsersForSideBar Controller:", err.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const getMessages = async (req, res) => {
       try{
            const {id} = req.params;
            const myId = req.user._id;
            const messages = await Message.find({
                $or:[
                    {senderId:myId,receiverId:id}, // senderId is me and receiverId is the other user
                    {senderId:id,receiverId:myId}  // senderId is the other user and receiverId is me
                ]
            })

            if(messages && messages.length > 0){
                return res.status(200).json(messages);
            }
            return res.status(404).json({messages:[],message:"No messages found"});
       }catch(err){
            console.log("Error in getMessages Controller:", err.message);
            res.status(500).json({message:"Internal Server Error"});
       }
}

export const sendMessage = async (req,res)=>{
    try{
        const {text,image} = req.body;
        const {id:receiverId} = req.params; // id is the receiverId
        const myId = req.user._id; // myId is the senderId

        let imageUrl;
        if(image){
            // upload image to cloudinary and get the url
            const result = await cloudinary.uploader.upload(image);
            imageUrl = result.secure_url;
        }

        const newMessage = new Message({
            senderId:myId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save(); // save the message to the database

        
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // if it exists it means he/she is online
            io.to(receiverSocketId).emit("newMessage",newMessage) // to is for authorization ( we want to send it only to receiver)
        }

        res.status(201).json(newMessage);
    }catch(err){
        console.log("Error in sendMessage Controller:", err.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const deleteSingleMsg = async (req,res)=>{
    const {msgId} = req.params;
    try{
        // console.log("id at bkend:",msgId)
        const result = await Message.findByIdAndDelete(msgId);
        const receiverSocketId = getReceiverSocketId(result.receiverId);
        // console.log("receiverSocketId",receiverSocketId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("msgDelete",result) // to is for authorization ( we want to send it only to receiver)
            
        }
        res.status(200).json({success:true,message:"successfully deleted"})
    }catch(error){
        console.log("error in deleteSingleMsg:",error);
        res.status(400).json({success:false,message:"cannot delete"})
    }
}
export const deleteAllMsgs = async (req,res)=>{
    const {receiverId} = req.params;
    // console.log(req.user)
    const {_id:myId} = req.user
    // console.log("receiverId and myId: ",receiverId,myId)

    try{
        const result = await Message.deleteMany({
            $or:[
            {senderId:receiverId,receiverId:myId}, // senderId is me and receiverId is the other user
            {senderId:myId,receiverId:receiverId}  // senderId is the other user and receiverId is me
        ]});

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // As cleared chat so send empty array to receiver
            //console.log("receiverSocketId:",receiverSocketId)
            io.to(receiverSocketId).emit("clearChat",[]) // to is for authorization ( we want to send it only to receiver)
            
        }

        // console.log(result)
        res.status(200).json({success:true,message:"Chat Cleared At receiver too..!"})
    }catch(error){
        console.log("error in deleteSingleMsg:",error);
        res.status(400).json({success:false,message:"Could not clear chat..!"})
    }
}

