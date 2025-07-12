import { Camera, Group, Loader2, MessagesSquare, Users } from "lucide-react";
import React, { useState } from "react";
import { useGroupStore } from "../store/useGroupStore";
import { useNavigate } from "react-router-dom";
import CreatePattern from "../components/CreatePattern";
import toast from "react-hot-toast";
import { usePersStore } from "../store/usePersStore";

const CreateGroupPage = () => {
  const navigate=useNavigate(); 
  const {setActiveTab}=usePersStore();
  const { isCreatingGroup, createGroup,newGroup } = useGroupStore();
   const [image, setImage] = useState(newGroup?.profilePic || "");
  const [formData, setFormData] = useState({
    name: "",
    profilePic: "",
  });

  const validate = (data) => {
    if (!data.name) return toast.error("Enter group's name");
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    const result = validate(formData);
    if (result === true) {
     const suc=await  createGroup(formData);
    
    if(suc){
        setActiveTab("groups");
        navigate("/");
    }}
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setImage(base64);
      setFormData((prev) => ({
      ...prev,
      profilePic: base64, 
    }));
    };
  };

  return (
    <div className="h-screen w-full grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-base-100 p-6 sm:p-12 text-base-content">
        <div className="p-2 bg-primary/10 rounded-lg mb-2 animate-bounce">
          <MessagesSquare className="size-10 text-primary" />
        </div>
        <div className="text-3xl font-medium">Create A New Group</div>
        <div className="font-normal mb-6 text-center">
          Create a space for conversations and ideas.
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-4 w-full max-w-lg"
        >
          <>
            <div className="relative w-36 h-36 mx-auto mb-4">
              <img
                src={image||"./groupProfile.png"}
                alt="Profile"
                className="w-36 h-36 mx-auto rounded-full mb-4 border-4 border-primary object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-base-100 p-1 rounded-full">
                <Camera className="size-6 text-base-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isCreatingGroup}
                />
              </label>
            </div>
            <p className="text-sm text-center text-base-content">
              {!isCreatingGroup
                ? "Click on the CAMERA icon to upload a new profile picture!"
                : "Uploading profile changes..."}
            </p>
          </>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Group Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="size-5 text-base-content" />
              </div>
              <input
                type="text"
                placeholder="Group name"
                className={`input input-bordered w-full pl-10`}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full btn-primary "
            disabled={isCreatingGroup}
          >
            {isCreatingGroup ? (
              <>
                <Loader2 className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Create Group"
            )}
          </button>
        </form>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 p-6 sm:p-12">
        <CreatePattern />
      </div>
    </div>
  );
};

export default CreateGroupPage;
