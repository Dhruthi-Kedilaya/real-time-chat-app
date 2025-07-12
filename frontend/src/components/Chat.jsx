import React, { useEffect } from "react";
import { ChatNav } from "./ChatNav";
import ChatType from "./ChatType";
import { useAuthStore } from "../store/useAuthStore";
import { useGroupStore } from "../store/useGroupStore";
import Join from "./Join";
import { usePersStore } from "../store/usePersStore";
import Messages from "./Messages";

const Chat = () => {
  const { authUser } = useAuthStore();
  const { activeTab, setActiveTab,getPerMsgs } = usePersStore();
  const { chosenGroup,viewOtherGroups } = useGroupStore();



  if ( activeTab == "groups" && viewOtherGroups==true) {
    return (
      <div className="flex-1 flex-col flex items-center justify-center">
        <ChatNav />
        <div className="mt-56">
          <Join />
        </div>
      </div>
    );
  }
  return (
    <div className="container flex-1 flex flex-col h-[calc(100vh-64px)]">
      <ChatNav />

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <Messages/>
      </div>

      <ChatType />
    </div>
  );
};

export default Chat;
