import React from "react";
import { usePersStore } from "../store/usePersStore";
import { useAuthStore } from "../store/useAuthStore";

const UserList = (props) => {
  const { users, chosenUser, setChosenUser } = usePersStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="flex-1 overflow-y-auto w-full space-y-4">
      {(props.users ).map((user, i) => (
        <button
          key={i}
          className={`flex items-center p-2 min-h-[72px] gap-4 w-full text-left transition-all duration-200 ${
            chosenUser?._id === user?._id
              ? "bg-primary/20"
              : "hover:bg-primary/10"
          }`}
          onClick={() => setChosenUser(user)}
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
  <img
    src={user.profilePic || "./blankProfile.png"}
    className="w-full h-full rounded-full object-cover"
    alt="Profile"
  />
  <div className={`absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 rounded-full ${
    onlineUsers.includes(user._id) ? "bg-green-500" : "bg-gray-500"
  }`}></div>
</div>

          <div className="hidden md:flex flex-col gap-2">
            <h1 className="text-base-content text-lg font-semibold text-left">
              {user.name[0].toUpperCase() + user.name.slice(1)}
            </h1>
            <div className="text-sm text-base-content font-normal">
              {onlineUsers.includes(user._id) ? "Online" : "Offline"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default UserList;
