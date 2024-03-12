import User from "../models/userSchema.js"; // Import User model

// Controller function for user registration
const registerUser = async (req, res) => {
  try {
    // Extract user details from request body
    const { firstName, lastName, email, password } = req.body;

    // Check if user with the provided email already exists
    const user = await User.findOne({ email });

    // If user exists, return error response
    if (user) {
      return res.status(404).json({
        success: false,
        message: "Email Already Registered",
      });
    }

    // Create a new user instance with provided details
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate authentication token for the new user
    const token = await newUser.generateAuthToken();

    // Set the authentication token in a cookie and send success response
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({
        success: true,
        message: "User Registered Successfully",
      });
  } catch (error) {
    // If an error occurs, send error response
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

// Controller function for user login
const loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email and include password field
    const user = await User.findOne({ email }).select("+password");

    // If user not found, return error response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Check if provided password matches user's password
    const isPasswordMatch = await user.matchPassword(password);

    // If password does not match, return error response
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Password does not match",
      });
    }

    // Generate authentication token for the user
    const token = await user.generateAuthToken();

    // Set the authentication token in a cookie and send success response
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({
        success: true,
        message: "User logged in successfully",
      });
  } catch (error) {
    // If an error occurs, send error response
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

// Controller function to get user profile
const getUserProfile = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.user._id);

    // Send success response with user profile
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // If an error occurs, send error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller function for user logout
const logout = (req, res) => {
  // Clear authentication token cookie and send success response
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};

// Export controller functions
export { registerUser, loginUser, getUserProfile, logout };
