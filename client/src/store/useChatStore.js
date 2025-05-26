import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import {toast} from 'react-hot-toast';
import {useAuthStore} from "./useAuthStore.js"

let deleteMsgHandler = null;
let clearChatHandler = null;
let subsToMsgsHandler = null;

export const useChatStore = create((set,get)=>({

    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    sendingMessage:false,
    chatTheme:"bg-base-300",


    getUsers: async ()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get('/message/users');
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message || 'something went wrong..!');
            console.log('error in useChatStore: ', error);
        } finally {
            set({isUsersLoading:false});
        }
    },
    getMessages: async (userId)=>{
        set({isMessagesLoading:true});
        set({messages:[]});
        try{
            
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages:res.data});
            
        }catch(error){
            console.log('error in useChatStore: ', error);
    }finally{
            set({isMessagesLoading:false});
        }
    },
   
    sendMessage:async (data)=>{
        const {selectedUser,messages} = get()
        set({sendingMessage:true})
        try{
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,data);
            set({messages:[...messages,res.data]}) // update message state by keeping prev messages and add new one
        }catch(error){
            toast.error(error.response.message || "something went wrong..!");
        }finally{
            set({sendingMessage:false})
        }
    },
    subsToMsgs:()=>{
       const {selectedUser} = get()
        if(!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        subsToMsgsHandler = (newMessage) => {
            // console.log("frontEnd:",newMessage)
            if(newMessage.senderId !== selectedUser._id) return;
            set({messages:[...get().messages,newMessage]},) // let previous messages be there
        }
        socket.on("newMessage",subsToMsgsHandler)
    },
    unSubsToMsgs:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage",subsToMsgsHandler);
    },
    setSelectedUser:(selectedUser)=>{
        set({selectedUser});
    },
    deleteMessage:async (msgId)=>{
         try{
            const res = await axiosInstance.delete(`/message/${msgId}`);
            set({messages:get().messages.filter(msg => msg._id !== msgId)})
            toast.success(res.data.message);
         }catch(error){
            console.log("Error in deleteMessage:",error);
            toast.error(error.response.message);
         }
    },
    deleteAllMsgs:async (receiverId)=>{
          try{
             const res = await axiosInstance.delete(`/message/all/${receiverId}`)
             set({messages:[]})
             toast.success(res.data.message);
          }catch(error){
            console.log("error in deleteAllMsgs",error);
            toast.error(error.response.message);
          }
    },
    clearChatSubs:()=>{
        const socket = useAuthStore.getState().socket;
        // console.log("delMsgSubs called",socket);
          clearChatHandler = (emptyArr)=>{
                // console.log(emptyArr)
                set({messages:emptyArr}) // replace with empty array in msgs to receiver
                toast.success(`chat cleared by ${get().selectedUser.fullName}`)
                //console.log(get().messages)
            }
          socket.on("clearChat",clearChatHandler)
    },
    clearChatUnsubs:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("clearChat",clearChatHandler);
    },
    delMsgSubscribe:()=>{
         const socket = useAuthStore.getState().socket;
            deleteMsgHandler = (deletedMsg) => {
             set({messages:get().messages.filter((message)=>(message._id !== deletedMsg._id))})
             toast.success(`msg deleted by ${get().selectedUser.fullName}`)
            //  console.log("remaining:",get().messages)
         }
         socket.on("msgDelete",deleteMsgHandler)
    },
    delMsgUnsubscribe:()=>{
         const socket = useAuthStore.getState().socket;
         socket.off("msgDelete",deleteMsgHandler); 
    },
    setChatTheme:(theme)=>{
        set({chatTheme:theme})
        toast.success("Theme Changed successfully..!")
    }
})
)
