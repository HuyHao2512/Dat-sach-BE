const { authJwt } = require("../middlewares");
const controller = require("../controllers/cart.controller");

module.exports = function (app) {
  app.post(
    "/api/cart/addtocart",
    [authJwt.verifyToken],
    controller.addItemToCart
  );

  app.get(
    "/api/cart/user/:userId",
    [authJwt.verifyToken],
    controller.getAllCartItemByUserId
  );

  app.put(
    "/api/cart/user/:userId",
    [authJwt.verifyToken],
    controller.updateItemInCart
  );

  app.delete(
    "/api/cart/removecart",
    [authJwt.verifyToken],
    controller.removeItemFromCart
  );
  app.delete(
    "/api/cart/removeusercart",
    [authJwt.verifyToken],
    controller.removeUserCart
  );
};
