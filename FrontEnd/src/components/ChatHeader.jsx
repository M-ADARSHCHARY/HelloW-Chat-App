import React from 'react'
import {useChatStore} from "../store/useChatStore.js";
import { useAuthStore} from '../store/useAuthStore.js';
import { X ,Trash} from "lucide-react";
import { useEffect,useState } from 'react';

const ChatHeader = ()=> {
  const {selectedUser,setSelectedUser,deleteAllMsgs,clearChatSubs,clearChatUnsubs} = useChatStore()
  const {onlineUsers,authUser} = useAuthStore()
  // console.log("ChatHeader :",selectedUser)
  const [delMsgs,setDelMsgs] = useState(false)
  

   useEffect(()=>{
      if(delMsgs == true){
        const handleDelete = ()=>{
           deleteAllMsgs(selectedUser?._id); 
           setDelMsgs(!delMsgs)
         }
         handleDelete();
      }
    },[delMsgs])

    useEffect(()=>{ 
      clearChatSubs();
      return ()=>{clearChatUnsubs()}
    },[selectedUser?._id])

  return (
    <div className="min-h-[70px] h-[10vh] bg-black flex items-center justify-between">
         <div className="h-full w-fit flex items-center gap-2 ml-2 justify-start">
            <img src={selectedUser?.profilePic} alt={selectedUser?.fullName} className="ml-1 size-12 object-cover rounded-full"/>
            <span className="text-1xl">
                 <h2 className="font-bold">{selectedUser?.fullName}</h2>
                 <h6 className={onlineUsers.includes(selectedUser._id)?"text-green-500":"text-red-400"}>{onlineUsers.includes(selectedUser._id)?("Online"):("offline")}</h6>
            </span>
         </div>
         <span className="flex gap-2">
          <button onClick={()=>{setDelMsgs(!delMsgs)}}className="p-1 rounded-md bg-slate-500 flex justify-center items-center hover:bg-red-800"><Trash size={24}/>Clear Chat</button>
         <button onClick={()=>setSelectedUser(null)} className="p-2 text-[#fff] hover:text-black hover:bg-[#fff] rounded mr-2">
                 <X className="w-5 h-5" />
         </button>
         </span>
    </div>
  )
}

export default ChatHeader
