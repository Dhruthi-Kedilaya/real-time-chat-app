import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import { getOtherSocketId, io } from "../lib/socket.js";

export const blockuser=async(req,res)=>{
    const toBlockId=req.params.id;
    try {
        const currentUser=req.user;
        if(currentUser.blockedUsers.includes(toBlockId)){
            return res.status(400).json({message:"User is already blocked"});
        }
        currentUser.blockedUsers.push(toBlockId);
        await currentUser.save();
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log("Error in blocking a user controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const unblockuser=async(req,res)=>{
    const toUnblockId=req.params.id;
    const currentId=req.user._id;
    try {
        const currentUser=req.user;
        if(!currentUser.blockedUsers.includes(toUnblockId)){
            return res.status(400).json({message:"User has not been blocked"});
        }
        const updatedUser=await User.findByIdAndUpdate(currentId,{$pull:{blockedUsers:toUnblockId}},{new:true}).select("-password");
        if(updatedUser){
            return res.status(200).json(updatedUser);
        }
    } catch (error) {
        console.log("Error in unblocking the user controller : ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const getblockedusers=async(req,res)=>{
    try {
        const user=req.user;
        const filterBlocked=await User.find({_id:{$in:user.blockedUsers}}).select("-password");
        return res.status(200).json(filterBlocked);
    } catch (error) {
        console.log("Error in getting blocked user controller : ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const getUsers=async(req,res)=>{
    const userId=req.user._id;
    const user=req.user;
    try {
        const filter=await User.find({
            $and:[
                {_id:{$nin:user.blockedUsers}},
                {_id:{$ne:userId}}
            ]
        }).select("-password -blockedUsers");
        return res.status(200).json(filter);
    } catch (error) {
        console.log("Error in users controller : ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const sendMsg=async(req,res)=>{
    const otherId=req.params.id;
    const myId=req.user._id;
    const {text,image}=req.body;
    try {
        if(!image && !text){
            return res.status(400).json({message:"Cannot send empty message"});
        }
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId:myId,
            receiverId:otherId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        const receiverSocketId=getOtherSocketId(otherId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("NewMsg",newMessage);
        }
        return res.status(200).json(newMessage);
    
    } catch (error) {
        console.log("Error in send message controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
    
};

export const getMsgs=async(req,res)=>{
    const otherId=req.params.id;
    const myId=req.user._id;
    try {
        const msgs=await Message.find({
            $or:[
                {senderId:otherId,receiverId:myId},
                {senderId:myId,receiverId:otherId}
            ]
        }).sort({ createdAt: 1 });;
        return res.status(200).json(msgs);
    } catch (error) {
        console.log("Error in the get all msgs controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};