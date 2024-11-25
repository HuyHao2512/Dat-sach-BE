// const express = require("express");
// const router = express.Router();
// const BookController = require("../controllers/book.controller");

// router.post("/createbook", BookController.createBook);
// router.get("/getallbooks", BookController.getAllBooks);
// router.get("/getbookbyid/:id", BookController.getBookById);
// router.put("/updatebook/:id", BookController.updateBook);
// router.delete("/deletebook/:id", BookController.deleteBook);
// module.exports = router;
const { authJwt } = require("../middlewares");
const controller = require("../controllers/book.controller");

module.exports = function (app) {
  app.post(
    "/api/book/createbook",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createBook
  );

  app.get("/api/book/getallbooks", controller.getAllBooks);

  app.get(
    "/api/book/getbookbyid/:id",
    [authJwt.verifyToken],
    controller.getBookById
  );
  app.put(
    "/api/book/updatebook/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateBook
  );
  app.delete(
    "/api/book/deletebook/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteBook
  );
};
