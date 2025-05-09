import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
      const user = await User.findById(payload.userId).select("-password");
      if(!user){
        return res.status(401).json({ message: "User not found" });
      }
        
      req.user = user;
      // console.log("userData",user);
      next();
    }
  } catch (err) {
    console.log("Error in authenticateUser Middleware:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
