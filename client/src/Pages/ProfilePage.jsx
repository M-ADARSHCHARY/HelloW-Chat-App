import React from 'react'
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera } from 'lucide-react';

const ProfilePage = () => {
  const {authUser,isUpdatingProfile,updateProfile} = useAuthStore();
  const [image,setImage] = React.useState(null);
  const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {return;}
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () =>{
          const base64Image = reader.result;
          setImage(base64Image);
          await updateProfile({profilePic:base64Image});
        }
      };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-xl border border-gray-200">
        <h2 className="text-center text-2xl font-bold text-black">Profile</h2>
        <p className="text-center text-sm text-gray-600">Your profile information</p>

        <div className="flex justify-center">
          <div className="relative">
            <img
              src={image || authUser.profilePic || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
              alt="Profile"
              className="object-cover w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-gray-300"
            />
            <label className={`absolute bottom-1 right-1 ${!isUpdatingProfile ? "bg-black hover:bg-gray-800" : "bg-gray-400"}  p-2 rounded-full cursor-pointer transition-colors duration-200`}>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageUpload} // <- optional handler
                  disabled={isUpdatingProfile} // <- disable input when updating profile
                />
                 <Camera className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </label>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600">{isUpdatingProfile ? "Uploading..." : "Click camera icon to upload"}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
         
            <label className="text-sm font-medium text-black justify-self-start md:justify-self-center">Full Name</label>
            <span
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 text-sm text-black">{authUser?.fullName}</span>
          
          
            <label className="text-sm font-medium text-black justify-self-start md:justify-self-center">Email Address</label>
            <span
              type="email"
              defaultValue="jason@gmail.com"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 text-sm text-black"
            >{authUser?.email}</span>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm font-medium text-black mb-4">Account Information</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Member Since</span>
              <span className="text-black font-medium">{authUser?.createdAt?.substring(0,10)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Account Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
