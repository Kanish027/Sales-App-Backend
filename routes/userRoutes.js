import express from "express"; // Import Express framework
import {
  getUserProfile,
  loginUser,
  logout,
  registerUser,
} from "../controllers/userControllers.js"; // Import user controller functions
import isAuthenticated from "../middleware/auth.js"; // Import authentication middleware

// Create an Express router instance
const router = express.Router();

// Route for user registration
router.post("/new", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for accessing user profile (requires authentication)
router.get("/profile", isAuthenticated, getUserProfile);

// Route for user logout
router.get("/logout", logout);

// Export router instance
export default router;
