import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "../models/user.model.js";

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ["profile", "email"],
}, async function(accessToken, refreshToken, profile, done) {
    try {
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });
        
        if (user) {
            // User exists, return user for JWT generation
            return done(null, user);
        } else {
            // Check if user exists with same email (from regular signup)
            user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                user.authProvider = 'google';
                await user.save();
                return done(null, user);
            } else {
                // Create new user
                const newUser = new User({
                    googleId: profile.id,
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value,
                    authProvider: 'google'
                });
                
                const savedUser = await newUser.save();
                return done(null, savedUser);
            }
        }
    } catch (error) {
        return done(error, null);
    }
}));

// For JWT-based approach, we don't need serialize/deserialize
// But we keep them minimal for Passport to work
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;

/*
   As now sign in with google does , all these three feature i.e

If user doesnot exists creates and returns token,
if already exists with same email ( local strategy links to goole and returns
If user exists with same google id return user object and login
*/