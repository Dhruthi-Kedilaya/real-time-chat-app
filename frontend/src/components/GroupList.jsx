import React, { useEffect } from "react";
import { useGroupStore } from "../store/useGroupStore";
import { useAuthStore } from "../store/useAuthStore"
import Join from "./Join";

const GroupList = () => {
  const {authUser}=useAuthStore();
  const {
    groups,
    chosenGroup,
    setChosenGroup,
    getMyGroups,
    viewOtherGroups,
    joinGroup,getOtherGroups
  } = useGroupStore();


  return (
    <div className="flex-1 overflow-y-auto w-full space-y-4">
      {groups.length === 0 ? (
        <>
          {viewOtherGroups ? (
            <>
              <p className="text-center text-base-content text-md px-2">
                You are part of all the groups of ChatterBox
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-base-content text-xl px-2">
                You have not joined any groups
              </p>
            </>
          )}
        </>
      ) : (
        <>
          {groups.map((group, i) => {
            return (
            <div
              key={i}
              className={`flex items-center p-1 gap-4 w-full text-left transition-all duration-200 hover:bg-primary/20 cursor-pointer ${
                chosenGroup?._id === group?._id ? "bg-primary/20" : ""
              }`}
              onClick={() => { setChosenGroup(group);}}
            >
              <div className="pl-2">
                <img
                  src={group.profilePic || "./groupProfile.png"}
                  className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-full"
                />
              </div>

              <div className="hidden md:flex flex-col gap-2">
                <h1 className="text-base-content text-lg font-semibold text-left">
                  {group.name[0].toUpperCase() + group.name.slice(1)}
                </h1>

                {viewOtherGroups && (
                  <button
                    className="btn btn-sm btn-outline btn-success w-24 text-sm mt-0"
                    onClick={async(e) => {
                      e.stopPropagation();
                      await joinGroup(group._id);
                      await getMyGroups();
                      await getOtherGroups();
                    }}
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          )})}
        </>
      )}
    </div>
  );
};

export default GroupList;
