import mongoose from "mongoose";

const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    members:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"User",}],
        default: [],
    },
    profilePic:{
        type:String,
        default:"",
    },
},{timestamps:true});

const Group=mongoose.model("Group",groupSchema);
export default Group;