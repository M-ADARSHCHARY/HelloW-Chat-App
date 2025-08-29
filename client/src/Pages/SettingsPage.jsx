import React ,{useEffect , useState} from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {Loader }from 'lucide-react'
import { useChatStore } from '../store/useChatStore';
const SettingsPage = () => {
    const {deleteAccount,isDeletingAccount} = useAuthStore()
    const {chatTheme,setChatTheme} = useChatStore()
    const [showPopup,setShowPopup] = useState(false);
    let prevThemeIndex = 0; // Outside the function to persist across calls

  const handleChangeTheme = () => {
    const themes = ["bg-base-300", "bg-[#533B4D]", "bg-[#1E1E2F]", "bg-[#2C2C3E]", "bg-[#3A3A4E]"];
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * themes.length);
    } while (newIndex === prevThemeIndex);

    prevThemeIndex = newIndex;
    setChatTheme(themes[newIndex]);
  }

  return (
    <>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
       <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6 sm:p-8 space-y-6">

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-black">Settings</h2>

        {/* Change Chat Theme */}
        <button className="w-full px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-200 rounded-xl shadow-sm text-base font-medium"onClick={handleChangeTheme}>
          Change Chat Theme
        </button>

        {/* Delete Account */}
        <button className="w-full px-6 py-3 bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 rounded-xl shadow-sm text-base font-medium" onClick={()=>{setShowPopup(!showPopup)}}>
          Delete Account
        </button>

       </div>
     </div>

    {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-full max-w-sm text-center space-y-4">
                <h3 className="text-xl font-bold text-black">Confirm Deletion</h3>
                <p className="text-gray-600 text-sm">Are you sure you want to delete your account? This action cannot be undone.</p>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {!isDeletingAccount ? (
                    <>
                 <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium" onClick={()=>{deleteAccount()}}>
                    Yes, Delete
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-black border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium" onClick={()=>{setShowPopup(!showPopup)}}>
                    Cancel
                    
                </button></>) : 
                <div className="w-full bg-gray-50 border border-gray-200 text-black flex flex-col justify-center items-center p-4 rounded-lg">
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mb-2"></div> 
                  <span className="text-sm font-medium">Deleting your Account...</span>
                </div> }
                </div>
            </div>
            </div>
            )}     
     </>
  );
 
};

export default SettingsPage;
