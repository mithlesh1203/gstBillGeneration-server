const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({ statusCode, message, data });
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, mobileNo, password } = req.body;
    if (!name || !email || !mobileNo || !password) {
      return handleResponse(res, 400, "All fields are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      mobileNo,
      password: hashedPassword,
      tokens: [], // Initialize tokens array
    });
    await newUser.save();
    const userResponse = { ...newUser._doc };
    delete userResponse.password;
    try {
      handleResponse(res, 201, "User created", userResponse);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      return handleResponse(res, 400, "Email already exists");
    }
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleResponse(res, 400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleResponse(res, 400, "Invalid credentials");
    }

    const token = jwt.sign(
      { email: user.email, mobileNo: user.mobileNo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    user.tokens.push({ token }); // Add token to tokens array
    await user.save(); // Save updated user to database

    const userResponse = { ...user._doc };
    delete userResponse.password; // Remove password before sending response

    handleResponse(res, 200, "Login successful", {
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    next(error);
  }
};

const logoutUser = (req, res) => {
  // Invalidate the token by setting its expiration to a past date
  res.status(200).json({ message: "Logout successful", token: null });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
