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
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md lg:max-w-lg w-full bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black mb-2">Welcome to Hellow</h2>
        <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-600 mb-4 sm:mb-6">Create Account</h3>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="fullName" className="block mb-1 text-sm sm:text-base font-medium text-black">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
              value={formData.fullName}
              onChange={(e)=> setFormData({...formData, fullName:e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm sm:text-base font-medium text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
              value={formData.email}
              onChange={(e)=> setFormData({...formData, email:e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm sm:text-base font-medium text-black">
              Create Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                value={formData.password}
                onChange={(e)=> setFormData({...formData, password:e.target.value})}
              />
              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-2">
             <button
            type="submit"
            className="w-full sm:flex-1 bg-black text-white py-2 sm:py-2.5 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-4 sm:size-5 animate-spin mr-2"/>
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>

             
                <button onClick={handleGoogleSignIn} className="w-full sm:w-auto flex items-center justify-center gap-2 p-2 sm:p-2.5 border-2 border-black rounded-xl text-black hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base">
                    <img 
                      src="https://www.svgrepo.com/show/355037/google.svg" 
                      alt="Google" 
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span className="font-medium">Google</span>
              </button>
             


          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600">
            Have an account? <Link to="/login" className="text-black font-medium hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
























