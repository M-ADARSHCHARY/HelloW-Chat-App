import React from 'react'
import {useChatStore} from "../store/useChatStore.js";
import { useAuthStore} from '../store/useAuthStore.js';
import { X ,Trash , Menu,ArrowLeft} from "lucide-react";
import { useEffect,useState } from 'react';

const ChatHeader = ()=> {
  const {selectedUser,setSelectedUser,deleteAllMsgs,clearChatSubs,clearChatUnsubs} = useChatStore()
  const {onlineUsers,authUser} = useAuthStore()
  const [isMenuOpen,setIsMenuOpen] = useState(false)
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
    <>
    <div className="min-h-[70px] h-[10vh] bg-black flex items-center justify-between">
         <div className="h-full w-fit flex items-center gap-2 ml-2 justify-start">
            <img src={selectedUser?.profilePic} alt={selectedUser?.fullName} className="ml-1 size-12 object-cover rounded-full"/>
            <span className="text-1xl">
                 <h2 className="font-bold text-white">{selectedUser?.fullName}</h2>
                 <h6 className={onlineUsers.includes(selectedUser._id)?"text-green-500":"text-red-400"}>{onlineUsers.includes(selectedUser._id)?("Online"):("offline")}</h6>
            </span>
         </div>
         <span className="flex gap-2 flex-column">
            <button className="p-2" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
              {!isMenuOpen ? <Menu size={24} className="text-white"/> : <X size={22} className="text-white"/>}
            </button>
         </span>
    </div>
    {isMenuOpen && (<div className="bg-gray-900 rounded-md p-2 w-fit h-fit absolute right-0 top-12 z-50" >
                      <button onClick={()=>{setDelMsgs(!delMsgs);setIsMenuOpen(!isMenuOpen)}}className="p-1 rounded-md  flex justify-center items-center cursor-pointer text-sm mb-1 gap-1"><Trash size={18}/>clear chat</button>
                      <button onClick={()=>setSelectedUser(null)} className="px-2 text-[#fff] rounded mr-2 flex items-center justify-center gap-1">
                           <ArrowLeft size={18} /> back  
                      </button>
                    </div>
               )
    }
    <div className="h-[2px] w-full bg-[#575353]"></div>
    </>
  )
}

export default ChatHeader
