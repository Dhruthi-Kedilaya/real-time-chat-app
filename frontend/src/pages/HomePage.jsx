import React from 'react'
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import NoChat from '../components/NoChat'
import { usePersStore } from '../store/usePersStore'
import { useGroupStore } from '../store/useGroupStore';

const HomePage = () => {
  const {chosenGroup}=useGroupStore();
  const {chosenUser,activeTab}=usePersStore();
  return (
     <div className="w-full h-screen bg-base-200 pt-0 overflow-hidden">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar: fixed width */}
        <div className="w-16 sm:w-20 md:w-56 lg:w-72 xl:w-80 min-w-0 h-full border-r border-primary">
          <Sidebar />
        </div>

        {/* Main Chat Area: takes remaining space */}
        <div className="flex-1 min-w-0 h-full overflow-hidden">
          {activeTab === 'contacts'
            ? chosenUser
              ? <Chat />
              : <NoChat />
            : chosenGroup
              ? <Chat />
              : <NoChat />}
        </div>
      </div>
    </div>
  )
}

export default HomePage