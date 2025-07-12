import { Users } from "lucide-react";
import React from "react";

const SideSkeleton = () => {
  return (
    <div className="w-20 sm:w-48 md:w-64 lg:w-72 xl:w-72 flex flex-col h-screen border-r border-primary items-center py-4">
      {/* Header with Tabs */}
      <div className="w-full px-0">
        <div className="flex items-center gap-2 w-full px-2 pb-1">
          <Users />
          <span className="text-2xl font-medium hidden sm:inline">
            Contacts
          </span>
        </div>

        <div className="flex justify-around mb-4 border-b border-primary pb-2">
          <button className="text-lg font-semibold  text-primary rounded-md bg-primary/30 p-1 hover:text-base-content">
            Contacts
          </button>
          <button className="text-lg font-semibold rounded-md hover:bg-primary/30 p-1 text-base-content">
            Groups
          </button>
        </div>
      </div>

      {/* Skeleton List */}
      <div className="flex-1 overflow-y-auto w-full px-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse p-1">
            <div className="h-14 w-14 sm:h-14 sm:w-14 bg-gray-700 rounded-full"></div>
            <div className="hidden sm:flex flex-col gap-2">
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
              <div className="h-3 w-32 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideSkeleton;
