import React ,{useEffect, useState}from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Eye, EyeOff ,Loader2 } from "lucide-react";
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
const SignUpPage = () => {

  const [showPassword,setShowPassword] = React.useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });
   const {signup,isSigningUp, checkAuth} = useAuthStore();
  
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


  // Handle OAuth redirects
  
    {/*
    When Google redirects back, URL changes from localhost:5173/login to localhost:5173/login?oauth=success
    searchParams changes → useEffect runs → OAuth handling executes */}
    useEffect(() => {
      const oauthResult = searchParams.get('oauth');
      const error = searchParams.get('error');
      if (oauthResult === 'success') {
        // toast.success('Signed in with Google successfully!');
        console.log("oauthResult Success");
        checkAuth(); // Refresh auth state
        setTimeout(() => navigate('/'), 100);
      } else if (error) {
        const errorMessages = {
          'oauth_failed': 'Google login failed. Please try again.',
          'token_generation_failed': 'Login successful but session creation failed.',
        };
        toast.error(errorMessages[error] || `Login failed: ${error}`);
      }
    }, [searchParams, navigate, checkAuth]);
  // Google OAuth handler
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
   
    // console.log("Google Sign In clicked"); // Debug log
     window.location.href = import.meta.env.VITE_MODE === "development" ? 'http://localhost:3000/api/auth/google' : `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

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

          <span>
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

             
                <button onClick={handleGoogleSignIn} className="mx-auto mt-2 flex items-center gap-2 p-2 border rounded text-black">
                    <img 
                      src="https://www.svgrepo.com/show/355037/google.svg" 
                      alt="Google" 
                      className="w-5 h-5"
                    />
                    <span>Sign in with Google</span>
              </button>
             


          </span>

          <span className="text-center text-sm text-gray-500">Have an account.? <Link to="/login" className="text-center text-sm text-indigo-700 hover:underline mt-2">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
























