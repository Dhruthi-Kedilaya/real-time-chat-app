import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5000" :"/";

export const useAuthStore=create((set,get)=>({
    authUser:null,
    blockedList:[],
    onlineUsers:[],
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    socket:null,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/authentication/me");
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            set({authUser:null});
            console.log("Error in checkAuth: ",error);
        }
        finally{
            set({isCheckingAuth:false});
        }
    },
    signUp:async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/authentication/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            set({isSigningUp:false})
        }
    },
    logOut:async()=>{
        try {
            const res=await axiosInstance.post("/authentication/logout");
            toast.success("Logged Out Successfully!");
            set({authUser:null});
            get().disConnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    },
    logIn:async(data)=>{
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post("/authentication/login",data);
            set({authUser:res.data});
            toast.success("Logged in successfully!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            set({isLoggingIn:false});
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res=await axiosInstance.put("/authentication/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            set({isUpdatingProfile:false});
        }
    },
    getBlockedList:async()=>{
        try{
            const res=await axiosInstance.get("/messages/blocked-users");
            set({blockedList:res.data});
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }
    },
    unBlock:async(id)=>{
        try{
            const res=await axiosInstance.post(`/messages/unblock/${id}`);
            set({authUser:res.data});
            await get().getBlockedList();
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }
    },
    connectSocket:()=>{
        const {authUser}=get();
        if(!authUser || get().socket?.connected)return;
        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id,
            },
        });
        socket.connect();
        set({socket:socket});
        socket.on("OnlinePer",(userIds)=>{
            set({onlineUsers:userIds});
        });
    },
    disConnectSocket:()=>{
        if(get().socket?.connected){
            get().socket.disconnect();
        }
    }
    
}));