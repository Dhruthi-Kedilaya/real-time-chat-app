import React from 'react'
import { usePersStore } from '../store/usePersStore'
import { useGroupStore } from '../store/useGroupStore';
import {Ban, LogOut, UserX, X} from "lucide-react"
import { useAuthStore } from '../store/useAuthStore';

export const ChatNav = () => {
    const {chosenUser,setChosenUser,activeTab,getUsers,blockUser}=usePersStore();
    const {chosenGroup,setChosenGroup,leaveGroup,viewOtherGroups}=useGroupStore();
    const {authUser,onlineUsers}=useAuthStore();
    const isMem=chosenGroup?.members.includes(authUser._id)
  return (
    <div className="flex gap-2 p-2 px-3 sm:px-5 items-center justify-between bg-base-100">
  {activeTab === "contacts" && (
    <div className="flex flex-1 gap-3 items-center">
      <img
        src={chosenUser.profilePic || "./blankProfile.png"}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h1 className="text-lg sm:text-lg font-semibold">
          {chosenUser.name[0].toUpperCase() + chosenUser.name.slice(1)}
        </h1>
        <p className="inline-flex items-center gap-1 text-sm sm:text-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              onlineUsers.includes(chosenUser._id)
                ? "bg-green-500"
                : "bg-base-content"
            }`}
          ></span>
          {onlineUsers.includes(chosenUser._id) ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  )}

  {activeTab === "groups" && (
    <div className="flex flex-1 gap-3 items-center">
      <img
        src={chosenGroup.profilePic || "./groupProfile.png"}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-xl sm:text-xl font-semibold">
          {chosenGroup.name[0].toUpperCase() + chosenGroup.name.slice(1)}
        </h1>
      </div>
    </div>
  )}

  <div className="flex gap-2 sm:gap-4 items-center">
    {/* Block Button */}
    {activeTab === "contacts" && (
      <button
        className="inline-flex gap-1 items-center btn btn-outline btn-error p-1 sm:p-2 text-xs sm:text-base"
        onClick={async () => {
          await blockUser(chosenUser._id);
          setChosenUser(null);
        }}
      >
        <Ban className="text-red-700 h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline text-red-700">Block</span>
      </button>
    )}

    {/* Leave Group Button */}
    {activeTab === "groups" && viewOtherGroups == false && (
      <button
        className="inline-flex gap-1 items-center btn btn-outline btn-error p-1 sm:p-2 text-xs sm:text-base"
        onClick={async () => {
          await leaveGroup(chosenGroup._id);
          setChosenGroup(null);
        }}
      >
        <LogOut className="text-red-700 h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline text-red-700">Leave</span>
      </button>
    )}

    {/* Close Button */}
    <button
      onClick={() =>
        activeTab === "contacts"
          ? setChosenUser(null)
          : setChosenGroup(null)
      }
      className="p-1 sm:p-2"
    >
      <X className="h-5 w-5 sm:h-7 sm:w-7" />
    </button>
  </div>
</div>

  )
}
