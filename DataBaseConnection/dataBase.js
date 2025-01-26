const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: 'GSTBILLGENERATION' })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connectToDatabase;