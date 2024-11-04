const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.model");

router.post("/createcategory", CategoryController.createCategory);
router.get("/getallcategories", CategoryController.getAllCategories);
router.get("/getcategorybyid/:id", CategoryController.getCategoryById);
router.put("/updatecategory/:id", CategoryController.updateCategory);
router.delete("/deletecategory/:id", CategoryController.deleteCategory);

module.exports = router;
