// const express = require("express");
// const router = express.Router();
// const OrderController = require("../controllers/order.controller");

// router.post("/createorder", OrderController.createOrder);
// router.get("/getallorders", OrderController.getAllOrders);
// router.get("/order/:id", OrderController.getOrderById);
// router.put("/updateorder/:id", OrderController.updateOrder);
// router.get("/getorderbyuser/:userId", OrderController.getOrderByUser);
// module.exports = router;
const { authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function (app) {
  app.post(
    "/api/order/createorder",
    [authJwt.verifyToken],
    controller.createOrder
  );
  app.get(
    "/api/order/getallorders",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllOrders
  );
  app.get(
    "/api/order/order/:id",
    [authJwt.verifyToken],
    controller.getOrderById
  );
  app.put(
    "/api/order/updateorder/:id",
    [authJwt.verifyToken],
    controller.updateOrder
  );
  app.get(
    "/api/order/getorderbyuser/:userId",
    [authJwt.verifyToken],
    controller.getOrderByUser
  );
};
