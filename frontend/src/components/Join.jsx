import React from "react";
import { useGroupStore } from "../store/useGroupStore";
import { useNavigate } from "react-router-dom";
import { usePersStore } from "../store/usePersStore";
import Chat from "./Chat";

const Join = () => {
  const { joinGroup, chosenGroup, setChosenGroup, setViewOtherGroups } =
    useGroupStore();
  const { setActiveTab } = usePersStore();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-2">
      <div className=" border border-base-content p-5 rounded-xl flex flex-col items-center">
        <h2 className="text-2xl text-center font-semibold text-primary">
          Join the Group
        </h2>
        <p className="text-base text-center text-base-content mb-3">
          You haven’t joined this group yet. Join now to view and participate in
          the conversation.
        </p>

        <button
          className="btn btn-sm btn-outline btn-success w-24 text-sm mt-0"
          onClick={async (e) => {
            e.stopPropagation();
            const updatedGroup = await joinGroup(chosenGroup._id); // ✅ get updated group from backend

    setChosenGroup(updatedGroup); 
            setActiveTab("groups");
            setViewOtherGroups(false);
            //setChosenGroup(chosenGroup);
            navigate("/");
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Join;
