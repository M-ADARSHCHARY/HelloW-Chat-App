import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import {io} from "socket.io-client";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers :[],
  socket:null,
  isDeletingAccount : false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("error in useAuthStore: ", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      // console.log("res in useAuthStore: ", res.data);
      toast.success("Account Created Successfully..!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong..!");
      console.log("error in useAuthStore: ", error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully..!");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong..!");
      console.log("error in useAuthStore: ", error);
    }
  },
  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      // console.log("res in useAuthStore: ", res.data);
      toast.success(res.data.message || "Logged in Successfully..!");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong..!");
      console.log("error in useAuthStore: ", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.patch("/auth/update-profile", data);
      set({ authUser: res.data });
      // console.log("res in useAuthStore: ", res.data);
      toast.success("Profile Updated Successfully..!");
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong..!");
      console.log("error in useAuthStore: ", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket:()=>{
    const {authUser} = get()
    if(!authUser || get().socket?.connected) return
      const socket = io(BASE_URL,{
        query:{
          userId:authUser._id,
        },
      });
      socket.connect(); 
      set({socket})
      // listenting for getOnlineUsers event from backend 
      socket.on("getOnlineUsers",(userIds)=>{
          set({onlineUsers:userIds}); // update onlineUsers state
      })
  },
  disconnectSocket:()=>{
    if(get().socket?.connected){
      get().socket.disconnect();
    }
  },
  deleteAccount:async ()=>{
    set({isDeletingAccount : true})
    try{
      let res = await axiosInstance.post("/auth/delete-Account");
      set({isDeletingAccount:false});
      set({authUser:null})
      // router.push("/login");
      toast.success("Account Deleted Successfully")
    }catch(error){
       console.log("error in deleteAccount",error);
       toast.error(error.response.message)
    }
  }
  
}));
