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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-5 space-y-6">
        <h2 className="text-center text-xl font-semibold text-yellow-400">Profile</h2>
        <p className="text-center text-sm text-gray-400">Your profile information</p>

        <div className="flex justify-center">
          <div className="relative">
            <img
              src={image || authUser.profilePic || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
              alt="Profile"
              className="object-cover w-24 h-24 rounded-full border-4 border-gray-700"
            />
            <label className={`absolute bottom-1 right-1 ${!isUpdatingProfile ? "bg-yellow-600" : "bg-yellow-200"}  p-1 rounded-full cursor-pointer`}>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageUpload} // <- optional handler
                  disabled={isUpdatingProfile} // <- disable input when updating profile
                />
                 <Camera className="text-white size-5" />
            </label>
          </div>
        </div>
        <h6 className="text-center">{isUpdatingProfile ? "Uploading..." : "Click on camera icon to upload"}</h6>

        <div className=" grid  grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden">
         
            <label className="text-sm text-gray-400 mr-1 justify-self-start md:justify-self-center">Full Name</label>
            <span
              className="size-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">{authUser?.fullName}</span>
          
          
            <label className="text-sm text-gray-400 mr-1 justify-self-start md:justify-self-center">Email Address</label>
            <span
              type="email"
              defaultValue="jason@gmail.com"
              className="size-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >{authUser?.email}</span>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 mb-2">Account Information</p>
          <div className="flex justify-between text-sm">
            <span>Member Since</span>
            <span className="text-gray-300">{authUser?.createdAt?.substring(0,10)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Account Status</span>
            <span className="text-green-400">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
