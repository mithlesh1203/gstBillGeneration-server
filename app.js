const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const connectToDatabase = require("./DataBaseConnection/dataBase");

// Middleware to parse JSON payloads
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Connect to the database
connectToDatabase();

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
