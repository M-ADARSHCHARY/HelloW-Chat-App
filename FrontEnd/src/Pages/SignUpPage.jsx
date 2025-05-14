import React from 'react'
import { useAuthStore } from '../Store/useAuthStore.js'
import { Eye, EyeOff ,Loader2 } from "lucide-react";
import { toast } from 'react-hot-toast';

const SignUpPage = () => {

  const [showPassword,setShowPassword] = React.useState(false);
  
  const [formData,setFormData] = React.useState({
    fullName:"",
    email:"",
    password:"",
  });
   const {signup,isSigningUp} = useAuthStore();
  
   const validateForm = ()=>{ 
      if(!formData.fullName.trim()) {
         return toast.error("Please enter your full name..!");
      }
      if(!formData.email.trim()) {
         return toast.error("Please enter your email..!");
      }
      if(!formData.password.trim()) {
          return toast.error("Please enter your password..!");
      }
      if(formData.password.length < 6) {
          return toast.error("Password must be at least 6 characters long..!");
      }
      return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if(isValid === true){
      signup(formData);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 sm:p-10">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome to Hellow</h2>
        <h3 className="text-center text-lg sm:text-xl font-semibold text-gray-600 mb-6">Create Account</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700 sm:text-right">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.fullName}
              onChange={(e)=> setFormData({...formData, fullName:e.target.value})}
            />

            <label htmlFor="email" className="text-sm font-medium text-gray-700 sm:text-right">Email</label>
            <input
              type="text"
              name="email"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={(e)=> setFormData({...formData, email:e.target.value})}
            />

            <label htmlFor="password" className="text-sm font-medium text-gray-700 sm:text-right">Create Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.password}
                onChange={(e)=> setFormData({...formData, password:e.target.value})}
              />
              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin"/>
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <a href="/login" className="text-center text-sm text-indigo-700 hover:underline mt-2">Have an account? Login</a>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
























