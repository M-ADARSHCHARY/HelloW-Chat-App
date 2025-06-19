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
    <div className="h-[80px] w-full bg-[#424769] flex justify-between items-center px-4 sticky top-0 z-50 text-white">
      <h1 className="text-2xl font-bold cursor-pointer">
        <Link className="hover:text-blue-600" to="/">HelloW</Link>
      </h1>

      {/* Desktop Nav */}
      <div className="hidden sm:flex gap-4 items-center">
        {authUser && <Link to="/" className="flex gap-1 hover:text-blue-600 items-center"><Home className="size-5" />Home</Link>}
        {authUser && <Link className="flex gap-1 hover:text-blue-600 items-center" to="/settings"><Settings className="size-6" />Settings</Link>}
        {authUser && <Link className="flex gap-1 hover:text-blue-600 items-center" to="/profile"><User className="size-5" />Profile</Link>}
        {authUser && <button onClick={logout} className="flex gap-1 hover:text-blue-600 items-center"><LogOut className="size-5" />Logout</button>}
      </div>

      {/* Hamburger Icon */}
      {authUser && <button className="sm:hidden" onClick={handleMenuOpen}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>}

      {/* Mobile Menu */}
      {(isOpen && authUser) && (
        <div className="absolute top-[80px] left-0 w-full bg-gray-800 flex flex-col items-start px-4 py-4 gap-4 sm:hidden">
          {authUser && <Link onClick={() => setIsOpen(!isOpen) } to="/" className="flex gap-1 hover:text-blue-600 items-center"><Home className="size-5" />Home</Link>}
          <Link to="/settings" className="flex gap-1 items-center" onClick={() => setIsOpen(!isOpen)}><Settings className="size-6" />Settings</Link>
          {authUser && <Link onClick={() => setIsOpen(!isOpen) } className="flex gap-1 hover:text-blue-600 items-center" to="/profile"><User className="size-5" />Profile</Link>}
          {authUser && <button onClick={logout} className="flex gap-1 hover:text-blue-600 items-center"><LogOut className="size-5" />Logout</button>}
        </div>
      )}
    </div>
  );
};

export default Navbar


