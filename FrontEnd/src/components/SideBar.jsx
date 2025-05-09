import React from 'react'
import { Heading1, Users } from 'lucide-react';
import { useChatStore } from '../store/useChatStore.js';
import {useAuthStore} from "../store/useAuthStore.js";
import { useState } from 'react';
const SideBar = () => {
  const {getUsers,users,selectedUser,setSelectedUser,isUsersLoading} = useChatStore();
  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly,setShowOnlineOnly] = useState(false);
  // console.log("From sideBar:" ,selectedUser)
  // console.log("showOnlineOnly",showOnlineOnly)
  React.useEffect(()=>{
    getUsers();
  },[getUsers])

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)):users;
  return (
    <div className="w-[100%] h-[100%] bg-black-900">
      <div className = "w-[100%]  p-5">
        <div className = "flex items-center gap-2">
               <Users className = "size-6"/>
               <span className="font-medium hidden lg:block">Contacts</span>
        </div>
           {/*onlinefilter toggle */}
           <div className="mt-3 hidden lg:flex items-center gap-2">
               <label htmlFor="cursor-pointer flex items-center">
                   <input type="checkbox"  onChange={(e)=> setShowOnlineOnly(!showOnlineOnly)} className="checkbox checkbox-sm mr-1"/>
                   <span className='text-sm'>show Online only</span>
               </label>
               <span className="text-xs text-zinc-500">({onlineUsers.length - 1}) online</span>
           </div>
      </div>
  
      <div className = "overflow-y-auto w-[100%] py-3 h-[72%] bg-black-900 flex-1 overflow-hidden">
            {filteredUsers.map((user)=>( 
              <button key={user?._id} onClick={()=> setSelectedUser(user) } className={`w-full flex items-center gap-2 ${selectedUser?._id === user?._id ? 'bg-base-200': 'bg-black-900'} hover:bg-gray-600  p-2 rounded-md `}>
                  <div className="flex items-center justify-center gap-2 relative">
                     <img src={user?.profilePic} alt={user?.fullName} className="size-12 object-cover rounded-full"/>
                     {onlineUsers.includes(user._id) && (
                      <span className="absolute bottom-0 right-1 size-3 bg-green-500 rounded-full">
                      </span>
                     )}
                  </div>

                  <div className="hidden  sm:block lg:block text-left min-w-0 "> 
                        <div className="font-medium truncate">{user.fullName}</div>
                        <div className={onlineUsers.includes(user._id)?"text-green-500":"text-red-300"}>
                          {onlineUsers.includes(user._id)?"Online":"offline"}
                        </div>
                  </div>
              </button>
            ))}
            {filteredUsers.length == 0 && <div className="text-zinc-300 text-center">"No online users"</div>}
      </div>
    </div>
  )
}

export default SideBar
