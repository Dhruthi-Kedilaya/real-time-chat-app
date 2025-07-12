import React from "react";

const CreatePattern = () => {
  return (
    <div>
      <>
        <div className=" sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-full sm:h-full text-center">
          <img src="./new.svg" alt="Chat icon" className="w-72 mb-1" />
          <h1 className="text-4xl font-bold text-base-content text-center mb-2">
            Build Your Community
          </h1>
          <p className="text-lg text-base-content text-center mb-6">
            Start a group to connect with friends, classmates, or colleagues.
            Set a group name, add a profile picture, and begin conversations
            instantly. It’s quick, easy, and collaborative.
          </p>
        </div>
      </>
    </div>
  );
};

export default CreatePattern;
