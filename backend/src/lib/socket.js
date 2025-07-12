import {Server} from "socket.io"
import http from "http"
import express from "express"
import { Socket } from "dgram";

const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
    },
});

const socketMap={}; //key->userID //value->respective socket ids

export const getOtherSocketId=(userId)=>{
    return socketMap[userId];
}

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);

    const userId=socket.handshake.query.userId;
    if(userId){
        socketMap[userId]=socket.id;
        io.emit("OnlinePer",Object.keys(socketMap));
    }

    socket.on("joinGroup",(groupId)=>{
        socket.join(groupId);
    })

    socket.on("leaveGroup",(groupId)=>{
        socket.leave(groupId);
    })
    
    socket.on("disconnect",()=>{
        console.log("A user disconnected ",socket.id);
        delete socketMap[userId];
        io.emit("OnlinePer",Object.keys(socketMap));
    })
});

export {io,app,server};