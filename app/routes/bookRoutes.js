const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.controller");

router.post("/createbook", BookController.createBook);
router.get("/getallbooks", BookController.getAllBooks);
router.get("/getbookbyid/:id", BookController.getBookById);
router.put("/updatebook/:id", BookController.updateBook);
router.delete("/deletebook/:id", BookController.deleteBook);
module.exports = router;
