import express from "express";
import { checkuser, login, logout, signup, updateprofile } from "../controller/authentication.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,updateprofile);
router.get("/me",protectRoute,checkuser);

export default router;