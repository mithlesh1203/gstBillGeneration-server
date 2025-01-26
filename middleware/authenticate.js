const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("No token provided in request headers.");
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    console.log("Token received:", token);
    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
      console.error("User not found with token:", token);
      throw new Error("User not found.");
    }

    req.token = token;
    req.user = user;
    console.log("User authenticated:", user);

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Please authenticate." });
  }
};

module.exports = authenticate;
