import {Routes,Route,Navigate} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import Navbar from "./components/Navbar.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";
function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  console.log("onlineUsers",onlineUsers)
  useEffect(()=>{
    checkAuth();
  },[])

  console.log({authUser})

  if(isCheckingAuth && !authUser) return (
      <div className="flex justify-center items-center h-screen">
         <Loader className="size-10 animate-spin"/>
         <p>Loading...</p>
      </div>
     )

  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path = "/" element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
        <Route path = "/signup" element={!authUser ? <SignUpPage/> : <Navigate to = "/"/>}/>
        <Route path = "/login" element={!authUser ? <LoginPage/> : <Navigate to = "/"/>}/>
        <Route path = "/settings" element={authUser ? <SettingsPage/> : <Navigate to = "/login"/>}/>
        <Route path = "/profile" element={authUser ? <ProfilePage/> : <Navigate to = "/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
