const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
  getAllCartItemByUserId,
  removeUserCart,
} = require("../controllers/cart.controller");

const router = express.Router();
router.get("/user/:userId", getAllCartItemByUserId);
router.post("/addtocart", addItemToCart);
router.delete("/removecart", removeItemFromCart);
router.put("/user/:userId", updateItemInCart);
router.post("/removecart", removeUserCart);
module.exports = router;
