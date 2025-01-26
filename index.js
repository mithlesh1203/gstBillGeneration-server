require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const connectToDatabase = require("./DataBaseConnection/dataBase");
const userRouter = require("./routes/userRoutes");
const shopRouter = require("./routes/shopRoutes");

app.use(cors()); // Fix the CORS middleware usage
app.use(express.json()); // Add middleware to parse JSON

// Connect to MongoDB
connectToDatabase();

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});

app.use("/user", userRouter); // Use the user router for user-related routes
app.use("/shop", shopRouter); // Use the shop router for shop-related routes

const PORT = process.env.PORT || 3001; // Ensure the port is 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
