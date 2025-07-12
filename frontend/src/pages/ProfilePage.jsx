import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Check, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const {
    authUser,
    updateProfile,
    isUpdatingProfile,
    getBlockedList,
    blockedList,
    unBlock,
  } = useAuthStore();
  const [name, setName] = useState(authUser.name);
  const [isEdited, setIsEdited] = useState(false);
  const [image, setImage] = useState(authUser.profilePic);

  useEffect(() => {
    getBlockedList();
  }, [getBlockedList]);

  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    setName(updatedName);
    setIsEdited(name !== authUser.name);
  };

  const handleUnblock = async (id) => {
    unBlock(id);
  };

  const handleNameSubmit = async () => {
    await updateProfile({ name: name });
    setIsEdited(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setImage(base64);
      await updateProfile({ profilePic: base64 });
    };
  };
  return (
    <div className="py-12 w-full bg-base-100 flex mt-4 pt-0  justify-center">
      <div className="max-w-lg w-full bg-base-200 p-6 flex flex-col space-y-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-primary">
          Profile Information
        </h2>
        <div className="relative w-36 h-36 mx-auto mb-4">
          <img
            src={authUser.profilePic || "./blankProfile.png"}
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
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-sm text-base-content">
          {!isUpdatingProfile
            ? "Click on the CAMERA icon to upload a new profile picture!"
            : "Uploading profile changes..."}
        </p>
        <div>
          <label className="label">
            <span className="label-text font-medium mt-0">Name</span>
          </label>
          <div className="flex relative items-center">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content size-5" />
            <input
              type="text"
              onChange={handleNameChange}
              value={name[0].toUpperCase() + name.slice(1)}
              disabled={isUpdatingProfile}
              className="input input-bordered w-full flex  gap-2 pl-9 py-2 bg-base-100 border border-primary text-base-content text-start cursor-default"
            />
            {isEdited && (
              <button
                type="button"
                onClick={() => handleNameSubmit()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:scale-110 transition"
              >
                <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <label className="label flex flex-col items-start gap-2">
          <span className="label-text font-medium">Email</span>
          <p className="input input-bordered w-full flex  gap-2 pl-4 py-2 bg-base-100 border border-primary text-base-content text-start cursor-default">
            <Mail />
            {authUser.email}
          </p>
        </label>

        {/* Blocked Users List */}
        <div className="text-left mt-6 ">
          <h3 className="text-2xl font-semibold mb-2">Blocked Users</h3>
          {blockedList.length === 0 ? (
            <p className="text-base-content">You haven't blocked anyone yet.</p>
          ) : (
            <ul className="space-y-3 border p-2 rounded-md border-primary">
              {blockedList.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-4 bg-base-100 p-3 rounded-lg border border-base-300"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-3 items-center">
                      <img
                        src={user.profilePic || "./blankProfile.png"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="font-medium">
                        {user?.name
                          ? user.name[0].toUpperCase() + user.name.slice(1)
                          : "Unnamed user"}
                      </p>
                    </div>

                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleUnblock(user._id)}
                    >
                      Unblock
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-left mt-6 ">
          <h3 className="text-2xl font-semibold mb-2">More Information</h3>
          <div className="flex items-center border-b border-primary justify-between w-full">
            <p className="text-lg font-medium">Member Since</p>

            <p className="text-md font-thin mb-2">
              {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-lg font-medium">Status</p>

            <p className="text-md text-green-500 font-thin mb-2">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
