import React ,{useEffect , useState} from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {Loader }from 'lucide-react'
import { useChatStore } from '../store/useChatStore';
const SettingsPage = () => {
    const {deleteAccount,isDeletingAccount} = useAuthStore()
    const {chatTheme,setChatTheme} = useChatStore()
    const [showPopup,setShowPopup] = useState(false);
    const handleChangeTheme = ()=>{
       if(chatTheme == "bg-base-300"){
           setChatTheme("bg-[#070F2B]")
       }else{
         setChatTheme("bg-base-300")
       }
    }
  return (
    <>
     <div className="h-screen w-full md:h-[80vh] md:w-[45vw] m-auto flex flex-col justify-center items-center p-6 rounded-lg shadow-xl text-white space-y-6">

      <h2 className="text-2xl font-semibold">Settings</h2>

      {/* Change Chat Theme */}
      <button className="w-52 px-4 py-2 bg-green-600 hover:bg-green-500 transition duration-300 rounded-md shadow-md text-lg"onClick={handleChangeTheme}>
        Change Chat Theme
      </button>

      {/* Delete Account */}
      <button className="w-52 px-4 py-2 bg-red-600 hover:bg-red-500 transition duration-300 rounded-md shadow-md text-lg" onClick={()=>{setShowPopup(!showPopup)}}>
        Delete Account
      </button>

    </div>

    {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
                <p className="text-gray-600">Are you sure you want to delete your account?</p>
                
                <div className="flex justify-around pt-4">
                {!isDeletingAccount ? (
                    <>
                 <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-200" onClick={()=>{deleteAccount()}}>
                    Yes, Delete
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200" onClick={()=>{setShowPopup(!showPopup)}}>
                    Cancel
                    
                </button></>) : <div className="h-full w-full bg-black flex flex-col justify-center items-center p-2 rounded-md"><Loader className="size-10 animate-spin"/> <span>Deleting your Account</span></div> }
                </div>
            </div>
            </div>
            )}     
     </>
  );
 
};

export default SettingsPage;
