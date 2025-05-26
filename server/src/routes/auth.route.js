import express from "express";
import { logIn, logOut, signUp,updateProfile,checkAuth ,deleteAccount } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
const router = express.Router({mergeParams: true});


router.post("/signup",signUp)

router.post("/login",logIn)

router.post("/logout",authenticateUser,logOut)

router.patch("/update-profile",authenticateUser,updateProfile);

router.get("/check",authenticateUser,checkAuth);

router.post("/delete-Account",authenticateUser,deleteAccount)
export default router;