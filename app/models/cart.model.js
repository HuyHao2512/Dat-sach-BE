const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Book",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "Cart",
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
