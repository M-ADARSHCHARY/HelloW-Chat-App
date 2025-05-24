import React from 'react'
import { useChatStore } from "../store/useChatStore.js";
import SideBar from '../components/SideBar.jsx';
import NoChatSelected from '../components/NoChatSelected.jsx';
import ChatBox from '../components/ChatBox.jsx';
const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className="h-85vh bg-base-200">
            <div className="w-[100%]  h-fit rounded-lg bg-base-100 grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_3fr]">
                <div className=" h-fit rounded-lg overflow-hidden ">
                    <SideBar/>
                 </div>     
                  {!selectedUser ? (<NoChatSelected/>) : (<ChatBox/>)}
            </div>
    </div>
  )
}

export default HomePage
