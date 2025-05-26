import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import ChatHeader from "./ChatHeader.jsx"
import MessageInput from './MessageInput.jsx'
import {Loader2 ,Trash } from "lucide-react"
import { useAuthStore } from '../store/useAuthStore.js'
import { formatMsgTime } from '../lib/utils.js'
import { useEffect,useRef } from 'react'
const ChatBox = () => {
  const {getMessages,messages,selectedUser,isMessagesLoading,subsToMsgs,unSubsToMsgs,deleteMessage,delMsgSubscribe,delMsgUnsubscribe,chatTheme} = useChatStore();
  // console.log(`${selectedUser.fullName} msgs: `,messages)
  const {authUser} = useAuthStore()

   const handleDelete = (msgId)=>{
        if(msgId){
          deleteMessage(msgId);
        }
   }

  const messageScrollRef = useRef(null);
  useEffect(()=>{
    if(messageScrollRef.current){
      messageScrollRef.current.scrollIntoView({
        behavior: 'smooth'
      });
      
    }
  },[messages])

   useEffect(()=>{
      getMessages(selectedUser?._id)
      subsToMsgs();

     return ()=>{unSubsToMsgs()}
  },[selectedUser._id,getMessages,subsToMsgs,unSubsToMsgs])

 useEffect(()=>{
   delMsgSubscribe();

   return ()=>{delMsgUnsubscribe()}
 },[selectedUser?._id])
  
  if(isMessagesLoading) return (
  <div className="h-[90vh] md:h-[90vh] w-full bg-black-400 relative">
       <ChatHeader/>
       <div className="flex justify-center items-center z-5 h-[75%] w-full bg-black-400 text-[#fff] overflow-y-auto space-y-4 overflow-hidden p-2">
              <Loader2 className="size-10 animate-spin"/>
       </div>
       <MessageInput/>
  </div>)
  return (
    <div className={`h-[90vh] md:h-[90vh] w-full relative ${chatTheme} flex flex-col justify-start`}>
       <ChatHeader/>

      <div  className="z-5 h-[75%] w-full bg-black-400 text-[#fff] overflow-y-auto space-y-4 overflow-hidden p-2">
        {messages.map((message)=>{
          return (
            <div ref = {messageScrollRef}  key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end":"chat-start"}`}>
              
              <div className="chat-image avatar m-1">
                <div className="size-10 rounded-full border">
                    <img className="size-10 rounded-full object-cover" src={message.senderId === authUser._id ? authUser.profilePic : selectedUser.profilePic } alt={selectedUser.fullName} />
                </div>
              </div>

            
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                  {formatMsgTime(message.createdAt)}
              </time>
            </div>

            <div className="flex gap-1">
                
                {message.senderId === authUser._id ?(<>
                  <button onClick={()=>{handleDelete(message._id)}}className="opacity-0 hover:opacity-100 transition">
                      <Trash className="size-4"/>
                </button>
                <div className="bg-green-800 rounded-md p-1 flex flex-col size-fit relative">
                  {message.image && (
                      <img src={message.image} alt="Attachment" className="sm:max-w-[100px] rounded-md mb-2"/>
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                </>):(<>
                <div className="bg-green-800 rounded-md p-1 flex flex-col size-fit relative">
                  {message.image && (
                      <img src={message.image} alt="Attach" className="max-w-[100px] rounded-md mb-2"/>
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                </>) }
            </div>
            {/*  */}
          </div>
          )
        })}
      </div>
       <MessageInput />
    </div>
  )
}
            
export default ChatBox


{/* <button className="absolute bottom-0 right-0">
                  
              </button> */}