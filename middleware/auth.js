import jwt from "jsonwebtoken"; // Import jsonwebtoken for token verification
import User from "../models/userSchema.js"; // Import User model

// Middleware function to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  // Extract token from request cookies
  const { token } = req.cookies;

  // If token is not present, return unauthorized status
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login to continue",
    });
  }
  // Verify the token using the JWT_SECRET
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // Find the user associated with the decoded token
  req.user = await User.findById(decoded._id);

  // Continue to the next middleware
  next();
};

// Export isAuthenticated middleware
export default isAuthenticated;
