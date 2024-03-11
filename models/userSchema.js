import mongoose from "mongoose"; // Import Mongoose for interacting with MongoDB
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords
import jwt from "jsonwebtoken"; // Import jsonwebtoken for generating JWT tokens

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // Define fields for first name, last name, email, and password
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Password field will not be returned in query results by default
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware function to hash the password before saving the user to the database
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10); // Generate salt for hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
});

// Method to compare provided password with the hashed password in the database
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare passwords
};

// Method to generate JWT token for authentication
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET); // Sign JWT token with user's _id and secret
};

// Create User model based on userSchema
const User = new mongoose.model("User", userSchema);

// Export User model
export default User;
