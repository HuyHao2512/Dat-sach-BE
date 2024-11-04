const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.post("/createorder", OrderController.createOrder);
router.get("/getallorders", OrderController.getAllOrders);
router.get("/order/:id", OrderController.getOrderById);
router.put("/updateorder/:id", OrderController.updateOrder);
router.get("/getorderbyuser/:userId", OrderController.getOrderByUser);
module.exports = router;
