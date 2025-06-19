import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import { toast } from 'react-hot-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
const LoginPage = () => {
 
  const {login,isLoggingIn,authUser} = useAuthStore();
  const [showPassword,setShowPassword] = React.useState(false);
  

  const [formData,setFormData] = React.useState({
    email:"",
    password:"",
  });

  const validateForm = (formData) =>{
     if(!formData.email.trim()){
        return toast.error("Please enter your email..!");
     }
      if(!formData.password.trim()){
          return toast.error("Please enter your password..!");
      }
      return true
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    let result = validateForm(formData);
    console.log("FORMDATA : ",formData)
    if(result === true){
      login(formData)
    }
  }

  


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange = {(e) => setFormData({...formData,email:e.target.value})}
              value={formData.email}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange = {(e) => setFormData({...formData,password:e.target.value})}
              value={formData.password}
            />
            <span onClick={()=>setShowPassword(!showPassword)} className="ml-1 absolute right-4 top-1">
              {showPassword ? <EyeOff className="text-black absolute right-2 top-7 cursor-pointer" />
               :
               <Eye className="text-black absolute right-2 top-7 cursor-pointer" />}
            </span>
          </div>

          <button className="btn btn-primary" type="submit" disabled = {isLoggingIn}>
               {(isLoggingIn && !authUser) ? (<><Loader2 className="size-10 animate-spin"/> LoggingIn..</>) :("Login")}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
