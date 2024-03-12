// Import necessary packages and modules
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import cors from "cors"; // Middleware for enabling CORS (Cross-Origin Resource Sharing)
import "dotenv/config"; // Load environment variables from .env file
import express from "express"; // Import the Express framework
import databaseConnection from "./database/databaseConnection.js"; // Import function for establishing database connection
import productRouter from "./routes/productRoutes.js"; // Import router for product-related endpoints
import userRouter from "./routes/userRoutes.js"; // Import router for user-related endpoints

// Initialize the Express application
const app = express();

// Establish connection to the database
databaseConnection();

// Middleware for parsing incoming JSON data
app.use(express.json());

// Middleware for parsing cookies from incoming requests
app.use(cookieParser());

// Middleware for enabling CORS with specified options
app.use(
  cors({
    // Allow requests from specified frontend origin
    origin: [process.env.FRONTEND_URI],
    // Allow specified HTTP methods
    methods: ["GET", "POST", "PUT", "DELETE"],
    // Allow credentials to be included in requests
    credentials: true,
  })
);

// Define routes for user-related endpoints
app.use("/api/v1/user", userRouter);

// Define routes for product-related endpoints
app.use("/api/v1/product", productRouter);

// Start the server, listening on the specified port
app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on PORT ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
