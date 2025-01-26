const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, mobileNo, password } = req.body;
    const newUser = new User({ name, email, mobileNo, password });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
};

module.exports = {
  createUser,
};
