import mongoose from "mongoose";

// The Product Schema to represent the structure of a product document
const productSchema = new mongoose.Schema({
  // Name of the product
  productName: {
    type: String,
    required: true, // Ensure product name is provided
  },
  // Quantity of the product
  quantity: {
    type: Number,
    required: true, // Ensure quantity is provided
  },
  // Sale amount of the product
  saleAmount: {
    type: Number,
    required: true, // Ensure sale amount is provided
  },
  // Reference to the User who added the product
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // Ensure user is associated with the product
  },
  // Timestamp indicating when the product was added
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
});

// Product Model using the Product Schema
const Product = new mongoose.model("Product", productSchema);

// Export the Product Model for use in other parts of the application
export default Product;
