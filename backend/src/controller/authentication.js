import { generateToken } from "../lib/genToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must have atleast 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      blockedUsers: [],
    });
    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
        blockedUsers: newUser.blockedUsers,
      });
    } else {
      return res.status(400).json({ message: "Invalid user details" });
    }
  } catch (error) {
    console.log("Error in the sign up controller : ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      blockedUsers: user.blockedUsers,
    });
  } catch (error) {
    console.log("Error in the log in controller : ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error in the log out controller : ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateprofile = async (req, res) => {
  const { name, profilePic } = req.body;
  try {
    if (!name && !profilePic) {
      return res
        .status(400)
        .json({ message: "Please fill in one of the fields" });
    }
    const updatedData = {};
    if (name) {
      updatedData.name = name;
    }
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updatedData.profilePic = uploadResponse.secure_url;
    }
    const userId = req.user._id;
    const updatedProfile = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log("Error in the update profile controller",error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkuser=async(req,res)=>{
  try{
    return res.status(200).json(req.user);
  }catch(error){
    console.log("Error in check user controller: ",error);
    return res.status(500).json({message:"Internal server error"});
  }
};