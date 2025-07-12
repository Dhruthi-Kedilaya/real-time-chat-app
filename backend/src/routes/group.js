import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { createGroup, getMsgs, joinGroup, leaveGroup, myGroups, otherGroups, sendMsg, updateProfile } from "../controller/group.js";

const router=express.Router();
router.post("/create-group",protectRoute,createGroup);
router.get("/mygroups",protectRoute,myGroups);
router.get("/other-groups",protectRoute,otherGroups);
router.put("/join-group/:id",protectRoute,joinGroup);
router.put("/leave-group/:id",protectRoute,leaveGroup);
router.post("/send/:id",protectRoute,sendMsg);
router.get("/:id",protectRoute,getMsgs);
router.put("/update-profile/:id",protectRoute,updateProfile);

export default router;