import User from "../models/user.model.js";
import  cloudinary  from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import Message from "../models/message.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    // check if Any field is empty
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // check for password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "E-mail already exists" });
    }

    // Hash password with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic:
        "https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4395.jpg",
    });

    if (newUser) {
      // Generate token using JWT
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "Account created successfully",
      });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("Error in signUp Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // if user exists then check for password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    } else {
      generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        message: `welcome ${user.fullName}`,
      });
    }
  } catch (err) {
    console.log("Error in logIn Controller:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
        secure: true, // use only over HTTPS in production
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logOut Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req,res)=>{
  try{
    const {profilePic} = req.body;
    if(!profilePic){
      return res.status(400).json({message:"Please provide a profile picture"});
    }
 
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true } // Return the updated user object
    );

    res.status(200).json(updatedUser)

  }catch(err){
    console.log("Error in updateProfile Controller:", err.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}

export const checkAuth = (req, res) => {
  try{
    // console.log("checking ...")
    res.status(200).json(req.user);
  }catch(err){
    console.log("Error in checkAuth Controller:", err.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}


export const deleteAccount = async (req,res)=>{
    const {_id:userId} = req.user;
     
    // first delete all his sent/received messages .

    try{
      let resultOne = await Message.deleteMany({
            $or:[
            {senderId:userId}, // message sent by him
            {receiverId:userId}  // message sent to him
        ]})

        let resultTwo = await User.findByIdAndDelete(userId);

        res.status(200).clearCookie("token", {
           httpOnly: true,
           secure: true, // only if using HTTPS
           sameSite: "strict", // adjust as needed
        }).json({success:true,message:"Account deleted Successfully"})
    }catch(error){
      res.status(400).json({success:false,message:"failed to delete Account."});
    } 
}