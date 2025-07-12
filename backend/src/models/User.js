import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength:6,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    blockedUsers: { type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"},],default:[], },
    groups:{ type: [{type: mongoose.Schema.Types.ObjectId, ref: "Group"},],default:[], },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
