import React, {useRef, useCallback, useState, useEffect} from 'react'
import { Heading1, Loader, Users } from 'lucide-react';
import { useChatStore } from '../store/useChatStore.js';
import {useAuthStore} from "../store/useAuthStore.js";

const SideBar = () => {
  const {
         getUsers,
         users,
         selectedUser,
         setSelectedUser,
         isUsersLoading,
         loadMoreUsers,
         hasMoreUsers,
         isLoadingMoreUsers
       } = useChatStore();

  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly,setShowOnlineOnly] = useState(false);
  const scrollContainerRef = useRef(null); // This creates a reference to the scrollable div so we can detect scroll events.
  
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;

    if(!container) return;

    // Check if scrolled to top (within 50px of top)
    if (container.scrollTop <= 50 && hasMoreUsers && !isLoadingMoreUsers) {
      console.log("Loading more users..."); // Debug log
      loadMoreUsers();
    }
  },[hasMoreUsers, isLoadingMoreUsers, loadMoreUsers]);

  useEffect(() => {
     const container = scrollContainerRef.current;

     if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll])

  useEffect(()=>{
    getUsers(); // skip-0, limit-10
  },[getUsers])

  const filteredUsers = showOnlineOnly ? users?.filter(user => onlineUsers?.includes(user._id)):users;

  // console.log("Filtered Users:", filteredUsers);
  return (
    <div className="w-full h-full bg-white border-r border-gray-200">
      <div className="w-full p-4 sm:p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
               <Users className="w-5 h-5 sm:w-6 sm:h-6 text-black"/>
               <span className="font-semibold text-black text-lg hidden lg:block">Contacts</span>
        </div>
           {/*onlinefilter toggle */}
           <div className="mt-3 hidden lg:flex items-center gap-2">
               <label className="cursor-pointer flex items-center">
                   <input type="checkbox"  onChange={(e)=> setShowOnlineOnly(!showOnlineOnly)} className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2 mr-2"/>
                   <span className="text-sm font-medium text-black">Show Online Only</span>
               </label>
               <span className="text-xs text-gray-500 ml-2">({onlineUsers.length - 1}) online</span>
           </div>
      </div>
  
      <div ref={scrollContainerRef} className="overflow-y-auto w-full py-2 h-[calc(100%-140px)] bg-white">
            {/* Loading indicator for loading more users */}
            {isLoadingMoreUsers && (
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            )}
            
            {filteredUsers?.map((user)=>( 
              <button key={user?._id} onClick={()=> setSelectedUser(user) } className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${selectedUser?._id === user?._id ? 'bg-black text-white hover:bg-gray-800': 'bg-white text-black'}`}>
                  <div className="relative flex-shrink-0">
                     <img src={user?.profilePic} alt={user?.fullName} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-gray-200"/>
                     {onlineUsers.includes(user._id) && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                      </span>
                     )}
                  </div>

                  <div className="hidden sm:block lg:block text-left min-w-0 flex-1"> 
                        <div className="font-medium truncate text-sm sm:text-base">{user.fullName}</div>
                        <div className={`text-xs sm:text-sm ${selectedUser?._id === user?._id ? (onlineUsers.includes(user._id) ? "text-green-300" : "text-gray-300") : (onlineUsers.includes(user._id) ? "text-green-500" : "text-gray-500")}`}>
                          {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                        </div>
                  </div>
              </button>
            ))}
            
            {/* No more users indicator */}
            {filteredUsers?.length > 0 && !hasMoreUsers && (
              <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 border-t border-gray-100">
                No more users to load
              </div>
            )}
            
            {filteredUsers?.length == 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300"/>
                <p className="text-sm">No online users</p>
              </div>
            )}
      </div>
    </div>
  )
}

export default SideBar
