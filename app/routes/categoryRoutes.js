// const express = require("express");
// const router = express.Router();
// const CategoryController = require("../controllers/category.controller");

// router.post("/createcategory", CategoryController.createCategory);
// router.get("/getallcategories", CategoryController.getAllCategories);
// router.get("/getcategorybyid/:id", CategoryController.getCategoryById);
// router.put("/updatecategory/:id", CategoryController.updateCategory);
// router.delete("/deletecategory/:id", CategoryController.deleteCategory);

// module.exports = router;
const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.post(
    "/api/category/createcategory",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createCategory
  );

  app.get(
    "/api/category/getallcategories",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllCategories
  );

  app.get(
    "/api/category/getcategorybyid/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getCategoryById
  );
  app.put(
    "/api/category/updatecategory/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateCategory
  );
  app.delete(
    "/api/category/deletecategory/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCategory
  );
};
