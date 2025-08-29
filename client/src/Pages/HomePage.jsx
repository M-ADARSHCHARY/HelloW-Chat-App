import React from 'react'
import { useChatStore } from "../store/useChatStore.js";
import SideBar from '../components/SideBar.jsx';
import NoChatSelected from '../components/NoChatSelected.jsx';
import ChatBox from '../components/ChatBox.jsx';
const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className="h-85vh bg-transparent">
            <div className="w-[100%]  h-fit rounded-lg bg-base-100 grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_3fr] relative">
                <div className="h-[90vh] rounded-lg overflow-hidden ">
                    <SideBar/>
                 </div>     
                  {!selectedUser ? (
                    <div className="h-fit w-fit relative top-[20%] md:top-[30%] lg:top-[30%] mx-auto">
                       <NoChatSelected/>
                    </div>
                    ) : (<ChatBox/>)}
            </div>
    </div>
  )
}

export default HomePage
