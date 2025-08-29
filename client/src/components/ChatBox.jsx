import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import ChatHeader from "./ChatHeader.jsx"
import MessageInput from './MessageInput.jsx'
import {Loader2 ,MessageSquare,Trash } from "lucide-react"
import { useAuthStore } from '../store/useAuthStore.js'
import { formatMsgTime } from '../lib/utils.js'
import { useEffect,useRef } from 'react'
import SwingingMessageIcon from '../framer-motion/SwingingMessageIcon.jsx'
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
  <div className="h-[90vh] md:h-[90vh] w-full bg-white relative border-l border-gray-200">
       <ChatHeader/>
       <div className="flex justify-center items-center z-5 h-[75%] w-full bg-white text-black overflow-y-auto space-y-4 overflow-hidden p-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 text-sm">Loading messages...</span>
              </div>
       </div>
       <MessageInput/>
  </div>)
  return (
    <div className="h-[90vh] md:h-[90vh] w-full relative bg-white border-l border-gray-200 flex flex-col justify-start">
       <ChatHeader/>
      {/*TO-DO: Add wallpaper functinoality */}
      <div 
        className="z-5 h-[77%] w-full bg-black text-black overflow-y-auto space-y-3 overflow-hidden p-4"
        // {style={{
        //   backgroundImage: `url(/images/wallpaper.jpg)`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat',
        //   backgroundAttachment: 'fixed'
        // }}}
      >

        {messages.length == 0 ? <div className="relative top-[45%] mx-auto flex flex-wrap justify-center items-center  h-fit w-fit p-2 text-white gap-x-2 opacity-[0.4]"><span className="whitespace-nowrap">Start a new conversation</span><SwingingMessageIcon/></div> : messages.map((message, index)=>{
          // Check if we need to show a date separator
          const currentMsgDate = new Date(message.createdAt).toDateString();
          const prevMsgDate = index > 0 ? new Date(messages[index - 1].createdAt).toDateString() : null;
          const showDateSeparator = index === 0 || currentMsgDate !== prevMsgDate;
          
          return (
            <div key={message._id}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="flex justify-center my-4">
                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                </div>
              )}
              
              <div ref={index === messages.length - 1 ? messageScrollRef : null} className={`flex ${message.senderId === authUser._id ? "justify-end":"justify-start"} mb-4`}>
                
                <div className={`flex items-end gap-2 max-w-[70%] ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
                  
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full object-cover border border-gray-300" src={message.senderId === authUser._id ? authUser.profilePic : selectedUser.profilePic } alt={selectedUser.fullName} />
                  </div>

                  <div className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}>
                    
                    <div className="text-xs text-gray-400 mb-1 px-1">
                        {new Date(message.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        })}
                    </div>

                    <div className="flex items-end gap-1">
                        
                        {message.senderId === authUser._id && (
                          <button onClick={()=>{handleDelete(message._id)}} className="opacity-0 hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-200 rounded">
                              <Trash className="w-4 h-4 text-gray-500 hover:text-red-500"/>
                          </button>
                        )}
                        
                        <div className={`rounded-2xl px-3 py-2 max-w-xs ${message.senderId === authUser._id ? 'bg-green-900 text-white' : 'bg-blue-900 text-white'} shadow-sm`}>
                          {message.image && (
                              <img src={message.image} alt="Attachment" className="max-w-[200px] rounded-lg mb-2"/>
                          )}
                          {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
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