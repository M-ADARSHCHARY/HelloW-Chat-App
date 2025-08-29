import React from 'react'
import {useChatStore} from "../store/useChatStore.js";
import { useAuthStore} from '../store/useAuthStore.js';
import { X ,Trash , Menu,ArrowLeft} from "lucide-react";
import { useEffect,useState , useContext } from 'react';
import { ChatMenuContext } from '../context/chatMenu.context.jsx';
const ChatHeader = ()=> {
  const {
         selectedUser,
         setSelectedUser,
         deleteAllMsgs,
         clearChatSubs,
         clearChatUnsubs } = useChatStore()

  const {onlineUsers,authUser} = useAuthStore()
  const {isChatMenuOpen,setIsChatMenuOpen} = useContext(ChatMenuContext)
      
  const handleDelete = ()=>{
       deleteAllMsgs(selectedUser?._id); 
  }

    useEffect(()=>{ 
        clearChatSubs(); // Keep listening for opponent clearChat event from backend
        return ()=>{clearChatUnsubs()}
    },[selectedUser?._id])

  return (
    <>
    <div className="min-h-[70px] h-[10vh] bg-white border-b border-gray-200 flex items-center justify-between px-4">
         <div className="h-full w-fit flex items-center gap-3 justify-start">
            <img src={selectedUser?.profilePic} alt={selectedUser?.fullName} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border border-gray-300"/>
            <div className="flex flex-col">
                 <h2 className="font-semibold text-black text-sm sm:text-base">{selectedUser?.fullName}</h2>
                 <p className={`text-xs sm:text-sm ${onlineUsers.includes(selectedUser._id)?"text-green-600":"text-gray-500"}`}>
                   {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                 </p>
            </div>
         </div>
         <div className="flex items-center">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" onClick={()=>setIsChatMenuOpen(!isChatMenuOpen)}>
              {!isChatMenuOpen ? <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-black"/> : <X className="w-5 h-5 sm:w-6 sm:h-6 text-black"/>}
            </button>
         </div>
    </div>
    {isChatMenuOpen && (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-fit h-fit absolute right-4 top-16 z-50" >
        <button 
          onClick={()=>{handleDelete();setIsChatMenuOpen(!isChatMenuOpen)}} 
          className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors duration-200 text-sm font-medium"
        >
          <Trash className="w-4 h-4"/>Clear Chat
        </button>
        <button 
          onClick={()=>setSelectedUser(null)} 
          className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-black hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />Back  
        </button>
      </div>
               )
    }
    </>
  )
}

export default ChatHeader
