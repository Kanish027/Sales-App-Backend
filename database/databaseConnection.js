import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Function to establish database connection
const databaseConnection = () => {
  // Attempt to connect to the MongoDB database using the provided URI
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "sales-app", // Specify the name of the database
    })
    .then(() => {
      console.log("Database Connection Established"); // Log successful connection
    })
    .catch((error) => console.log(error)); // Log any errors that occur during connection
};

// Export databaseConnection function
export default databaseConnection;
