import toast from "react-hot-toast";
import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const usePersStore=create((set,get)=>({
    users:[],
    chats:[],
    chosenUser:null,
    isUsersLoading:false,
    isPersMsgLoading:false,
    isChatsLoading:false,
    activeTab:"contacts",
    getUsers:async()=>{
        set({isUsersLoading:true});
        try{
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data});
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            set({isUsersLoading:false});
        }
    },
    getChats:async(otherId)=>{
        set({isChatsLoading:true})
        try {
            const res=await axiosInstance.get(`/messages/${otherId}`);
            set({chats:res.data})
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            set({isChatsLoading:false});
        }
    },
    setChosenUser:(user)=>{
        set({chosenUser:user});
    },
    setActiveTab:(want)=>{
        set({activeTab:want});
    },
    blockUser:async(otherId)=>{
        try {
            const res=await axiosInstance.post(`/messages/block/${otherId}`);
            await get().getUsers();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    },
    sendPersMsg:async(otherId,data)=>{
        const {chats}=get();
        try{
            const res=await axiosInstance.post(`/messages/send/${otherId}`,data);
            set({chats:[...chats,res.data]});
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }

    },
    getPerMsgs:async(otherId)=>{
        set({isPersMsgLoading:true});
        const {chats}=get();
        try {
            const res=await axiosInstance.get(`/messages/${otherId}`);
            set({chats:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            set({isPersMsgLoading:false});
        }
    },
    listenToMsgs:()=>{
        
        const {chosenUser}=get();
        if(!chosenUser)return;
        const socket=useAuthStore.getState().socket;
        //everything named with NewMsg is sent to every one so receive the messages from the socket iff that is coming from the user u selected
        
        socket.on("NewMsg",(newmsg)=>{
            if(newmsg.senderId!==chosenUser._id)return;
            const {chats}=get();
            set({
                chats:[...chats,newmsg]
            });
        });
    },
    stopListenToMsgs:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("NewMsg");
    }
}))