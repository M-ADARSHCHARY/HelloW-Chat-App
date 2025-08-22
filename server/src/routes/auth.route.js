import express from "express";
import { logIn, logOut, signUp,updateProfile,checkAuth ,deleteAccount } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import passport from "passport"
import { generateToken } from "../lib/utils.js";

const router = express.Router({mergeParams: true});



router.post("/signup",signUp)

router.post("/login",logIn)

router.post("/logout",authenticateUser,logOut)

router.patch("/update-profile",authenticateUser,updateProfile);

router.get("/check",authenticateUser,checkAuth);

router.post("/delete-Account",authenticateUser,deleteAccount)



// NEW JWT-BASED OAUTH ROUTES:

// 1. Start Google OAuth flow
router.get("/google", (req, res, next) => {
    // console.log("1: Starting Google OAuth flow");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

// 2. Google callback route - JWT APPROACH
router.get("/google/callback", 
    passport.authenticate("google", { 
        failureRedirect: `${process.env.DEV_MODE === "development" ? "http://localhost:5173" : process.env.CLIENT_URL}/login?error=oauth_failed`,
        session: false  // ← Disable sessions since we're using JWT
    }),
    (req, res) => {
        try {
            // Generate JWT token for the OAuth user
            // console.log("req.user after CallBack:",req.user)
            const token = generateToken(req.user._id, res);
            
            // Redirect to frontend with success
            res.redirect(`${process.env.DEV_MODE === "development" ? "http://localhost:5173" : process.env.CLIENT_URL}?oauth=success`);
        } catch (error) {
            console.error("OAuth callback error:", error);
            res.redirect(`${process.env.DEV_MODE === "development" ? "http://localhost:5173" : process.env.CLIENT_URL}/login?error=token_generation_failed`);
        }
    }
);



export default router;