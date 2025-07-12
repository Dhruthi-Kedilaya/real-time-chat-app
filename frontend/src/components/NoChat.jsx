import React from "react";
import { usePersStore } from "../store/usePersStore";

const NoChat = () => {
  const {activeTab,setActiveTab}=usePersStore();
  return (
    <>
      {activeTab=="contacts" ? (
        <>
        <div className="flex flex-col justify-center items-center w-full h-full text-center">
      <img src="./g.svg" alt="Chat icon" className="w-72 mb-1" />
      <h1 className="text-4xl font-bold text-base-content text-center mb-2">
        Welcome to the Chat App
      </h1>
      <p className="text-lg text-base-content text-center mb-6">
        Select a user from the list to start a real-time conversation.
      </p>
      </div>
      </>
      ):(
          <>
          <div className="flex flex-col justify-center items-center w-full h-full text-center">
      <img src="./d.svg" alt="Chat icon" className="w-72 mb-1" />
      <h1 className="text-4xl font-bold text-base-content text-center mb-2">
        Welcome to Group Chat
      </h1>
      <p className="text-lg text-base-content text-center mb-6">
        Select an existing group, join one, or create a new group to start chatting with everyone.
      </p>
      </div>
      </>

      )}
      </>
    
  );
};

export default NoChat;
