const Shop = require("../models/Shop"); // Ensure the Shop model is imported correctly
const handleResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({ statusCode, message, data });
};

const createShop = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const { shopName, gstin, email, mobileNo, address, district, state, pincode } = req.body;
    const user = req.user; // Assuming user is added to req by authentication middleware
    const newShop = new Shop({
      shopName,
      gstin,
      email,
      mobileNo,
      address,
      district,
      state,
      pincode,
      user: user._id,
    });
    await newShop.save();
    handleResponse(res, 201, "Shop created", newShop);
  } catch (error) {
    console.error("Error creating shop:", error.message);
    next(error);
  }
};

const getShops = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const shops = await Shop.find({ user: req.user._id });
    handleResponse(res, 200, "Shops retrieved", shops);
  } catch (error) {
    next(error);
  }
};

const getShopById = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const { id } = req.params;
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    handleResponse(res, 200, "Shop retrieved", shop);
  } catch (error) {
    next(error);
  }
};

const updateShop = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const { id } = req.params;
    const updatedShop = await Shop.findByIdAndUpdate(id, req.body, { new: true });
    handleResponse(res, 200, "Shop updated", updatedShop);
  } catch (error) {
    next(error);
  }
};

const deleteShop = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const { id } = req.params;
    await Shop.findByIdAndDelete(id);
    handleResponse(res, 200, "Shop deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShop,
  getShops,
  getShopById,
  updateShop,
  deleteShop,
};
