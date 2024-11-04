const CategoryModel = require("../models/category.model");
//Tạo loại sách
const createCategory = async (req, res) => {
  var category_name = req.body.category_name;
  var description = req.body.description;
  await CategoryModel.create({
    category_name: category_name,
    description: description,
  })
    .then((data) => {
      res.status(200).json({ message: "Thêm loại sách thành công", data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//Lấy tất cả loại sách
const getAllCategories = async (req, res) => {
  await CategoryModel.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//Lấy loại sách theo id
const getCategoryById = async (req, res) => {
  var id = req.params.id;
  await CategoryModel.findById
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//Cập nhật loại sách
const updateCategory = async (req, res) => {
  var id = req.params.id;
  var name = req.body.name;
  var description = req.body.description;
  await CategoryModel.updateOne(
    { _id: id },
    {
      name: name,
      description: description,
    }
  )
    .then((data) => {
      res.status(200).json({ message: "Cập nhật loại sách thành công", data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//Xóa loại sách
const deleteCategory = async (req, res) => {
  var id = req.params.id;
  await CategoryModel.deleteOne({ _id: id })
    .then((data) => {
      res.status(200).json({ message: "Xóa loại sách thành công", data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
