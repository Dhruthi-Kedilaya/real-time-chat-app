import React, { useEffect, useState } from "react";
import SideSkeleton from "../skeleton/SideSkeleton";
import { usePersStore } from "../store/usePersStore";
import { Users } from "lucide-react";
import UserList from "./UserList";
import GroupList from "./GroupList";
import { useGroupStore } from "../store/useGroupStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const [showOnline,setShowOnline]=useState(false);
  const {
    isGroupsLoading,
    getMyGroups,
    getOtherGroups,
    viewOtherGroups,
    setViewOtherGroups,
  } = useGroupStore();

  const {onlineUsers}=useAuthStore();
  const {
    users,
    chosenUser,
    isUsersLoading,
    getUsers,
    activeTab,
    setActiveTab,
  } = usePersStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  useEffect(() => {
    if (viewOtherGroups) {
      getOtherGroups();
    } else {
      getMyGroups();
    }
  }, [viewOtherGroups]);

  const filter=showOnline ? users.filter((user)=>onlineUsers.includes(user._id)) : users;
  if (isUsersLoading || isGroupsLoading) {
    return <SideSkeleton />;
  }
  return (
    <div className="w-16 sm:w-20 md:w-56 lg:w-72 xl:w-80 min-w-0 flex flex-col h-full border-r border-primary py-4 overflow-hidden">
      <div className="w-full flex flex-col flex-1 overflow-hidden px-0">
          <div className="flex flex-col space-y-1 mb-1">
            <div className="flex items-center gap-2 w-full  pb-1">
              <Users />
              <span className="text-2xl font-medium hidden sm:inline truncate">
                Contacts
              </span>
            </div>

            {activeTab === "contacts" ? (
              <div className="px-2 flex items-center gap-1">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={showOnline}
                  onChange={(e) => {setShowOnline(e.target.checked)}}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-base-content">
                  View online users only
                </span>
                {showOnline && <span className="text-base-content">
                  {onlineUsers.length-1} Online
                </span>}
                </div>
              </div>
            ) : (
              <div className="px-2 flex items-center gap-1">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={viewOtherGroups}
                  onChange={(e) => setViewOtherGroups(e.target.checked)}
                />
                <span className="text-base-content">View other groups</span>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row w-full justify-around mb-4 border-b border-primary pb-2">
            <button
              className={`text-lg font-semibold ${
                activeTab === "contacts"
                  ? "text-primary rounded-md bg-primary/30 p-1"
                  : "text-base-content"
              }`}
              onClick={() => setActiveTab("contacts")}
            >
              Contacts
            </button>
            <button
              className={`text-lg font-semibold ${
                activeTab === "groups"
                  ? "text-primary rounded-md bg-primary/30 p-1"
                  : "text-base-content"
              }`}
              onClick={() => setActiveTab("groups")}
            >
              Groups
            </button>
          </div>

          <div className="flex-1 overflow-y-auto w-full px-2 space-y-2">
            {activeTab === "contacts" ? <UserList users={filter}/> : <GroupList />}
          </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
