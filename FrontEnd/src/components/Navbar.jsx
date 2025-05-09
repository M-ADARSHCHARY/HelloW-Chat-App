import React from 'react'
import { useAuthStore } from "../store/useAuthStore.js";
import { Settings, User,LogOut ,Menu,X} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-[80px] w-full bg-gray-900 flex justify-between items-center px-4 sticky top-0 z-50 text-white">
      <h1 className="text-2xl font-bold cursor-pointer">
        <Link className="hover:text-blue-600" to="/">HelloW</Link>
      </h1>

      {/* Desktop Nav */}
      <div className="hidden sm:flex gap-4 items-center">
        <button className="flex gap-1 items-center"><Settings className="size-6" />Settings</button>
        {authUser && <Link className="flex gap-1 hover:text-blue-600 items-center" to="/profile"><User className="size-5" />Profile</Link>}
        {authUser && <button onClick={logout} className="flex gap-1 hover:text-blue-600 items-center"><LogOut className="size-5" />Logout</button>}
      </div>

      {/* Hamburger Icon */}
      <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-gray-800 flex flex-col items-start px-4 py-4 gap-4 sm:hidden">
          <button className="flex gap-1 items-center" onClick={() => setIsOpen(!isOpen)}><Settings className="size-6" />Settings</button>
          {authUser && <Link onClick={() => setIsOpen(!isOpen) } className="flex gap-1 hover:text-blue-600 items-center" to="/profile"><User className="size-5" />Profile</Link>}
          {authUser && <button onClick={logout} className="flex gap-1 hover:text-blue-600 items-center"><LogOut className="size-5" />Logout</button>}
        </div>
      )}
    </div>
  );
};

export default Navbar



{/* <div className="h-[80px] w-full bg-gray-900 flex justify-between items-center px-4 sticky top-0 z-50">
      <h1 className="text-2xl font-bold cursor-pointer"><Link className = "hover:text-blue-600" to = {"/"}>HelloW</Link></h1>
      <div className="hidden sm:flex md:flex gap-4 items-center h-full w-fit">
          <button className="flex gap-1"><Settings className="size-6"/>settings</button>
          {authUser ? <Link className = "flex gap-1 hover:text-blue-600" to = {"/profile"}><User className="size-5"/>Profile</Link> : ""}
          {authUser ? <button onClick={logout} className="flex gap-1 hover:text-blue-600"><LogOut className="size-5"/>Logout</button> : ""}
      </div>

      <button className="sm:hidden md:hidden">
          <Menu size={32} className="text-#fff" strokeWidth={2}/>
      </button>
    </div> */}
