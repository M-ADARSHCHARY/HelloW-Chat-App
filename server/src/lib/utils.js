import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    // Generate token using JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    // Set the token in a cookie
    res.cookie("token", token,
    {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "none", // Required for cross-site cookies
        httpOnly: true,
       secure: true,
    })
   
    return token;
};