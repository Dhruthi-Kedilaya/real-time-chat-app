import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js"
import Group from "../models/Group.js";
import mongoose from "mongoose";
import Message from "../models/Message.js"
import { io } from "../lib/socket.js";

export const createGroup=async(req,res)=>{
    const myId=req.user._id;
    try {
        const {name,profilePic}=req.body;
        if(!name){
            return res.status(400).json("give a name to your group");
        }
        const existingGroup=await Group.findOne({name});
        if(existingGroup){
            return res.status(400).json("Group with this name exists...try some other name");
        }
        let imageUrl="";
        if(profilePic){
            const uploadRes=await cloudinary.uploader.upload(profilePic);
            imageUrl=uploadRes.secure_url;
        }
        const user=await User.findById(myId);
        const newGroup=new Group({
            name,
            members:[myId],
            profilePic:imageUrl,
        });
        await newGroup.save();
        user.groups.push(newGroup._id);
        await user.save();
        return res.status(200).json(newGroup);
    } catch (error) {
        console.log("Error is creating a group controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const myGroups=async(req,res)=>{
    try {
        const user=req.user;
        const mygroups=await Group.find({_id:{$in:user.groups}}).sort({ createdAt: -1 });
        return res.status(200).json(mygroups);
    } catch (error) {
        console.log("Error is fetching users group controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const otherGroups=async(req,res)=>{
    try {
        const user=req.user;
        const exclude=user.groups||[];
        const filter=await Group.find({_id:{$nin:exclude}});
        res.status(200).json(filter);
    } catch (error) {
        console.log("Error in fetching other groups controller");
        return res.status(500).json({message:"Internal server error"});
    }
};

export const joinGroup=async(req,res)=>{
    try {
        const user=req.user;
        const groupId=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID" });
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: "No group with this ID exists" });
        }
        if(user.groups.includes(groupId)){
            return res.status(400).json({message:"You are already part of that group"});
        }
        user.groups.push(groupId);
        await user.save();
        group.members.push(user._id);
        await group.save();
        return res.status(200).json(group);
    } catch (error) {
        console.log("Error is joining a group controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const leaveGroup=async(req,res)=>{
    try {
        const user=req.user;
        const groupId=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID" });
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: "No group with this ID exists" });
        }
        if(!user.groups.includes(groupId)){
            return res.status(400).json({message:"You are not a part of this group"});
        }
        const upUser=await User.findByIdAndUpdate(user._id,{$pull:{groups:groupId}},{new:true});
        const upGroup=await Group.findByIdAndUpdate(groupId,{$pull:{members:user._id}},{new:true});
        return res.status(200).json(upGroup);
    } catch (error) {
        console.log("error in the leaving the group controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const sendMsg=async(req,res)=>{
    try {
        const {text,image}=req.body;
        let imageUrl="";
        if(!text && !image){
            return res.status(400).json({message:"Body cannot be empty!"});
        }
        const user=req.user;
        const groupId=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID" });
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: "No group with this ID exists" });
        }
        if(!user.groups.includes(groupId)){
            return res.status(400).json({message:"You are not a part of this group"});
        }
        if(image){
            const uploadRes=await cloudinary.uploader.upload(image);
            imageUrl=uploadRes.secure_url;
        }
        const newMessage=new Message({
            senderId:user._id,
            groupId,
            text,
            image:imageUrl,
        });
        await newMessage.save();
        io.to(groupId).emit("newGroupMsg",newMessage);
        return res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sending message in a group controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const getMsgs=async(req,res)=>{
    try {
        const myId=req.user._id;
        const user=req.user;
        const groupId=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID" });
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: "No group with this ID exists" });
        }
        if(!user.groups.includes(groupId)){
            return res.status(400).json({message:"You are not a part of this group"});
        }
        const filter=await Message.find({groupId}).sort({ createdAt: 1 });
        return res.status(200).json(filter);
    } catch (error) {
        console.log("Error in getting messages controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const updateProfile=async(req,res)=>{
    try {
        const myId=req.user._id;
        const user=req.user;
        const groupId=req.params.id;
        const {profilePic}=req.body;
        if(!profilePic){
            return res.status(400).json({message:"No profile picture"});
        }
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID" });
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: "No group with this ID exists" });
        }
        if(!user.groups.includes(groupId)){
            return res.status(400).json({message:"You are not a part of this group"});
        }
        
        let imageUrl="";
        const uploadRes=await cloudinary.uploader.upload(profilePic);
        imageUrl=uploadRes.secure_url;
        
        const update=await Group.findByIdAndUpdate(groupId,{profilePic:imageUrl},{new:true});
        return res.status(200).json(update);
    } catch (error) {
        console.log("Error in getting messages controller: ",error);
        return res.status(500).json({message:"Internal server error"});
    }
};