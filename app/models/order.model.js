const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    OrderItem: [
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
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "Chờ xác nhận",
      enum: ["Chờ xác nhận", "Đang vận chuyển", "Đã giao", "Đã hủy"],
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "Order",
  }
);
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
