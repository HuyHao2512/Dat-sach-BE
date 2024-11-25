const BookModel = require("../models/book.model");
const createBook = async (req, res) => {
  try {
    // let imageUrl = req.file ? req.file.path : ""; // Lấy URL hình ảnh đã upload lên Cloudinary
    const {
      book_name,
      category,
      author,
      publisher,
      price,
      discount,
      image,
      countInStock,
      description,
    } = req.body;
    // Validate dữ liệu
    if (
      !book_name ||
      !category ||
      !author ||
      !publisher ||
      !price ||
      !countInStock
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin sách!" });
    }
    // Tạo sách mới
    const newBook = await BookModel.create({
      book_name,
      category,
      author,
      publisher,
      price,
      discount,
      countInStock,
      image,
      description,
    });

    res.status(200).json({ message: "Thêm sách thành công", data: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi thêm sách", error: error.message });
  }
};

const PAGE_SIZE = 8;
const getAllBooks = async (req, res) => {
  const { page, des, sortBy, sortOrder } = req.query;
  let sortOptions = {};
  // Xác định trường sắp xếp và thứ tự sắp xếp
  if (sortBy) {
    switch (sortBy) {
      case "price":
        sortOptions.price = sortOrder === "desc" ? -1 : 1;
        break;
      case "name":
        sortOptions.book_name = sortOrder === "desc" ? -1 : 1;
        break;
      default:
        sortOptions.createdAt = -1;
    }
  } else {
    sortOptions.createdAt = -1;
  }

  // Xử lý phân trang
  let pageNumber = parseInt(page) || 1;
  if (pageNumber <= 0) pageNumber = 1;
  const elementsPass = (pageNumber - 1) * PAGE_SIZE;

  try {
    let query = {};
    if (des) {
      query.book_name = { $regex: des, $options: "i" };
    }
    const data = await BookModel.find(query)
      .skip(elementsPass)
      .limit(PAGE_SIZE)
      .sort(sortOptions)
      .populate("category", "category_name");
    // const page = parseInt(req.query.page) || 1; pageNumber
    // const itemsPerPage = parseInt(req.query.itemsPerPage) || 8; LIMIT
    const totalItems = await BookModel.countDocuments();
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    res.status(200).json({
      data,
      totalItems,
      totalPages,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookById = async (req, res) => {
  var id = req.params.id;
  await BookModel.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
const updateBook = async (req, res) => {
  var id = req.params.id;
  var book_name = req.body.book_name;
  var category = req.body.category;
  var author = req.body.author;
  var publisher = req.body.publisher;
  var price = req.body.price;
  var discount = req.body.discount;
  var countInStock = req.body.countInStock;
  var image = req.body.image;
  var description = req.body.description;
  await BookModel.updateOne(
    { _id: id },
    {
      book_name: book_name,
      category: category,
      author: author,
      publisher: publisher,
      price: price,
      discount: discount,
      countInStock: countInStock,
      image: image,
      description: description,
    }
  )
    .then((data) => {
      res.status(200).json({ message: "Cập nhật sách thành công!", data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
const deleteBook = async (req, res) => {
  var id = req.params.id;
  await BookModel.deleteOne({ _id: id })
    .then((data) => {
      res.status(200).json({ message: "Xóa sách thành công!", data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
