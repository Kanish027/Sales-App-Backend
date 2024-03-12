// Importing the Product model
import Product from "../models/productSchema.js";

// Route handler for adding a new product
const addNewProduct = async (req, res) => {
  // Extracting product data from the request body
  const { productName, quantity, saleAmount } = req.body;
  try {
    // Creating a new product in the database
    await Product.create({
      productName: productName,
      quantity: quantity,
      saleAmount: saleAmount,
      user: req.user, // Associating the product with the logged-in user
    });
    // Responding with a success message
    res.status(201).json({
      success: true,
      message: "New Product Added",
    });
  } catch (error) {
    // Handling server error and responding with an error message
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Route handler for getting all products associated with the logged-in user
const getAllProducts = async (req, res) => {
  try {
    // Finding all products belonging to the logged-in user
    const products = await Product.find({ user: req.user._id });
    if (!products) {
      // Responding with a not found message if no products are found
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // Responding with a success message and the retrieved products
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    // Handling server error and responding with an error message
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Route handler for getting the total revenue generated in the last 24 hours
const get24HrsRevenue = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    // Set the time to 00:00:00 for the current date
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
      0
    );
    // Calculate the timestamp from the start of the day
    const twentyFourHoursAgo = new Date(
      startOfDay.getTime() - 24 * 60 * 60 * 1000
    );
    // Aggregating total revenue for products created in the last 24 hours
    const revenue = await Product.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: twentyFourHoursAgo, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$saleAmount" },
        },
      },
    ]);

    // Responding with a success message and the total revenue
    res.status(200).json({
      success: true,
      totalRevenue: revenue.length ? revenue[0].totalRevenue : 0, // If no revenue is generated, send 0
    });
  } catch (error) {
    // Handling server error and responding with an error message
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Exporting the route handlers
export { addNewProduct, getAllProducts, get24HrsRevenue };
