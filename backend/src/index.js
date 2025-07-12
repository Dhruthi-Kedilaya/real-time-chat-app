import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js";
import bodyParser from "body-parser";
import authenticationRoutes from "./routes/authentication.js"
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.js"
import groupRoutes from "./routes/group.js"
import cors from "cors"
import {app,server} from "./lib/socket.js"
import path from "path"

dotenv.config();

const PORT=process.env.PORT;
const __dirname=path.resolve();
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit: '5mb'}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use("/api/authentication",authenticationRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/groups",groupRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}


server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
    connectDb();
})  