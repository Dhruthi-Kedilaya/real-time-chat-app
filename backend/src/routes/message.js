import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { blockuser, getblockedusers, getMsgs, getUsers, sendMsg, unblockuser } from "../controller/message.js";

const router=express.Router();

router.post("/block/:id",protectRoute,blockuser);
router.post("/unblock/:id",protectRoute,unblockuser);
router.get("/blocked-users",protectRoute,getblockedusers);
router.get("/users",protectRoute,getUsers);
router.post("/send/:id",protectRoute,sendMsg);
router.get("/:id",protectRoute,getMsgs);

export default router