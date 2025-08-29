import React from 'react'
import { useAuthStore } from "../store/useAuthStore.js";
import { Settings, User,LogOut ,Menu,X,Home} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState , useContext } from 'react';
import { ChatMenuContext } from '../context/chatMenu.context.jsx';
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [settingsVisible,setSettingsvisible] = useState(false)
  const {isChatMenuOpen,setIsChatMenuOpen} = useContext(ChatMenuContext);
  // console.log("re-rendered Navbar");
  const handleMenuOpen = () => {
    if(isChatMenuOpen) { // close chatMenu and open main menu when chatMenu is Open
      setIsChatMenuOpen(!isChatMenuOpen);
    } 
    setIsOpen(!isOpen)
  }
  return (
    <div className="h-[80px] w-full bg-white border-b border-gray-200 flex justify-between items-center px-4 sm:px-6 sticky top-0 z-50 text-black shadow-sm">
      <h1 className="text-2xl font-bold cursor-pointer">
        <Link className="hover:text-gray-600 transition-colors duration-200" to="/">HelloW</Link>
      </h1>

      {/* Desktop Nav */}
      <div className="hidden sm:flex gap-6 items-center">
        {authUser && <Link to="/" className="flex gap-2 hover:text-gray-600 items-center transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"><Home className="w-5 h-5" />Home</Link>}
        {authUser && <Link className="flex gap-2 hover:text-gray-600 items-center transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50" to="/settings"><Settings className="w-5 h-5" />Settings</Link>}
        {authUser && <Link className="flex gap-2 hover:text-gray-600 items-center transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50" to="/profile"><User className="w-5 h-5" />Profile</Link>}
        {authUser && <button onClick={logout} className="flex gap-2 hover:text-red-600 items-center transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50"><LogOut className="w-5 h-5" />Logout</button>}
      </div>

      {/* Hamburger Icon */}
      {authUser && <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" onClick={handleMenuOpen}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>}

      {/* Mobile Menu */}
      {(isOpen && authUser) && (
        <div className="absolute top-[80px] left-0 w-full bg-white border-b border-gray-200 flex flex-col items-start px-4 py-4 gap-2 sm:hidden shadow-lg">
          {authUser && <Link onClick={() => setIsOpen(!isOpen) } to="/" className="flex gap-2 hover:text-gray-600 items-center w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"><Home className="w-5 h-5" />Home</Link>}
          <Link to="/settings" className="flex gap-2 items-center w-full px-3 py-2 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200" onClick={() => setIsOpen(!isOpen)}><Settings className="w-5 h-5" />Settings</Link>
          {authUser && <Link onClick={() => setIsOpen(!isOpen) } className="flex gap-2 hover:text-gray-600 items-center w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200" to="/profile"><User className="w-5 h-5" />Profile</Link>}
          {authUser && <button onClick={logout} className="flex gap-2 hover:text-red-600 items-center w-full px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200"><LogOut className="w-5 h-5" />Logout</button>}
        </div>
      )}
    </div>
  );
};

export default Navbar


