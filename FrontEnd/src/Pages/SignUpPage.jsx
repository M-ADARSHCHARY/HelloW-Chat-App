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
     // Handle for avoiding unnecessary API calls
      if(!formData.fullName.trim())
      {
         return toast.error("Please enter your full name..!");
      }
      if(!formData.email.trim())
      {
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
    console.log("isValid",isValid);
    if(isValid === true){
      signup(formData);
    }
  }

  return (
    <div className = "min-h-screen w-full">
        <div className="min-h-fit h-[60vh] w-[85vw] sm:w-[45vw] sm:h-[58vh] md:w-[40wv] bg-[#fff] m-auto relative top-[20vh] rounded-md">
            <h2 className="text-center text-black font-bold">Welcome to Hellow</h2>
            <h3 className="text-center text-black font-bold">Create Account</h3>
            <form onSubmit = {handleSubmit} className="overflow-hidden h-full w-full flex flex-col justify-center items-center gap-4">
                <div className="h-fit p-3 w-[90%]  grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label htmlFor="fullName" className="text-black justify-self-center">FullName</label>
                    <input type="text" className="p-1 rounded-md"  name="fullName" value={formData.fullName} onChange = {(e)=> setFormData({...formData,fullName:e.target.value})} />
                    <label htmlFor="email" className="text-black justify-self-center">email</label>
                    <input type="text" className="text-1xl p-1 rounded-md" name="email" value={formData.email} onChange = {(e)=> setFormData({...formData,email:e.target.value})} />
                    <label htmlFor="password" className="text-black justify-self-center">create Password</label>
                    <span className="relative">
                    <input type={showPassword ? "text" : "password"}  className="p-1 rounded-md" name="password" value={formData.password} onChange = {(e)=> setFormData({...formData,password:e.target.value})}/>
                    <button onClick={()=>setShowPassword(!showPassword)} className="ml-1">
                        {showPassword ? <EyeOff className="text-black absolute right-14 top-1" />
                         :
                         <Eye className="text-white absolute right-14 top-1" />}
                    </button>
                    </span>
                    
                </div>
                <button className="btn">
                    {isSigningUp ? (
                        <>
                          <Loader2 className = "size-5 animate-spin"/>
                          Loading...
                        </>
                    )
                    :
                    ("Create Account")}
                </button>
                <a href="/login" className="text-blue-900">Have an Account ?Login</a>
            </form>
        </div>
    </div>
  )
}

export default SignUpPage
