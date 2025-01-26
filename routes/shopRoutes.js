const express = require("express");
const router = express.Router();
const {
  createShop,
  getShops,
  getShopById,
  updateShop,
  deleteShop,
} = require("../controllers/shopController"); // Ensure createShop is exported correctly
const authenticate = require("../middleware/authenticate"); // Assuming you have an authentication middleware

router.post("/create", authenticate, createShop); // Update the route to /create
router.get("/", authenticate, getShops);
router.get("/:id", authenticate, getShopById); // Add route to get shop by ID
router.put("/:id", authenticate, updateShop);
router.delete("/:id", authenticate, deleteShop);

module.exports = router;
