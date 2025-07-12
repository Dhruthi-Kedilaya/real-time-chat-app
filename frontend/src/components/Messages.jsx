import React, { useEffect, useRef } from "react";
import { usePersStore } from "../store/usePersStore";
import { useGroupStore } from "../store/useGroupStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "../skeleton/MessageSkeleton";

const Messages = () => {
  const { chosenUser, activeTab, chats, getPerMsgs ,isPersMsgLoading,listenToMsgs,stopListenToMsgs} = usePersStore();
  const { authUser } = useAuthStore();
  const { viewOtherGroups,chosenGroup,messages,getGroupMsgs,isGrpMsgLoading ,stopListeningToGroups,listenToGroups} = useGroupStore();
  const msgEndRef=useRef(null);
  const chatEndRef=useRef(null);

  useEffect(() => {
  if (chosenUser?._id) {
    getPerMsgs(chosenUser._id);

    listenToMsgs();
    return()=>stopListenToMsgs();
    
  }
}, [getPerMsgs, chosenUser?._id,listenToMsgs,stopListenToMsgs]);

useEffect(() => {
  if (chosenGroup?._id) {
    getGroupMsgs(chosenGroup._id);

    listenToGroups();
    return()=>stopListeningToGroups();
  }
}, [getGroupMsgs,chosenGroup?._id,listenToGroups,stopListeningToGroups]);

useEffect(()=>{
  if(messages){
    msgEndRef.current?.scrollIntoView({behavior:"smooth"});
  }
},[messages]);

useEffect(()=>{
  if(chats){
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  }
},[chats]);

if(isPersMsgLoading || isGrpMsgLoading){
    return <MessageSkeleton/>
}


  return (
    <div>
      {activeTab == "contacts" && (
        <div>
          {chats.length === 0 && (
            <p className="text-center text-sm text-base-content/50 mt-4">
              No messages yet
            </p>
          )}
          {chats.map((chat, i) => (
            <div
              key={i}
              ref={chatEndRef}
              className={`chat ${
                authUser._id == chat.senderId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      authUser._id == chat.senderId
                        ? authUser.profilePic || "./blankProfile.png"
                        : chosenUser.profilePic || "./blankProfile.png"
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(chat.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              {chat.text && <div className="chat-bubble">{chat.text}</div>}
              {chat.image && (
                <div className="chat-bubble">
                  <img
                    src={chat.image}
                    className="h-72 rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}



      {(activeTab == "groups" && viewOtherGroups == false) && (
        <div>
          {messages.length === 0 && (
            <p className="text-center text-sm text-base-content/50 mt-4">
              No messages yet
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              ref={msgEndRef}
              className={`chat ${
                authUser._id == msg.senderId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      authUser._id == msg.senderId
                        ? authUser.profilePic || "./blankProfile.png"
                        : chosenGroup.profilePic || "./groupProfile.png"
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              {msg.text && <div className="chat-bubble">{msg.text}</div>}
              {msg.image && (
                <div className="chat-bubble">
                  <img
                    src={msg.image}
                    className="h-72 rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) }
    </div>
  );
};

export default Messages;
