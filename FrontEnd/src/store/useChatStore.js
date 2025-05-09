import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import {toast} from 'react-hot-toast';
import {useAuthStore} from "./useAuthStore.js"

export const useChatStore = create((set,get)=>({

    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    sendingMessage:false,


    getUsers: async ()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get('/message/users');
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message || 'something went wrong..!');
            console.log('error in useChatStore: ', error);
        } finally {
            set({isUersLoading:false});
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

        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId !== selectedUser._id) return;
            set({messages:[...get().messages,newMessage]},) // let previous messages be there
        })
    },
    unSubsToMsgs:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
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
    }

})






)
