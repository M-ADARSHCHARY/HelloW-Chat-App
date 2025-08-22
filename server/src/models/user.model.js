import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:false,
        minlength:6,
    },
    profilePic:{
        type:String,
        default:"",
    },

    //New fields for OAuth
    googleId:{
        type:String,
        unique:true,
        sparse:true,
    },
    authProvider:{
        type:String,
        enum:["google", "local"], // local means normal email/password
        default:"local"
    }
},
  {timestamps:true,}
);

const User = mongoose.model("User",userSchema);

export default User;