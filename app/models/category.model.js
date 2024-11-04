const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "Category",
  }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
