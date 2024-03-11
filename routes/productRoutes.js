// Importing the Express framework for building the router
import express from "express";
import isAuthenticated from "../middleware/auth.js"; // Importing authentication middleware
import {
  addNewProduct,
  get24HrsRevenue,
  getAllProducts,
} from "../controllers/productControllers.js"; // Importing product-related controller functions

// Create an instance of the Express Router
const router = express.Router();

// Define route for adding a new product, requiring user authentication
router.post("/new", isAuthenticated, addNewProduct);

// Define route for retrieving all products, requiring user authentication
router.get("/all", isAuthenticated, getAllProducts);

// Define route for retrieving 24-hour revenue, requiring user authentication
router.get("/revenue", isAuthenticated, get24HrsRevenue);

// Export the router to be used in other parts of the application
export default router;
