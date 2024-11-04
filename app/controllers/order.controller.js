const OrderModel = require("../models/order.model");
const BookModel = require("../models/book.model");
const mongoose = require("mongoose");
//Tạo đơn hàng
const createOrder = async (req, res) => {
  var OrderItem = req.body.OrderItem;
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var shippingPrice = req.body.shippingPrice;
  var totalPrice = req.body.totalPrice;
  var userId = req.body.userId;
  var status = req.body.status;
  await OrderModel.create({
    OrderItem: OrderItem,
    name: name,
    address: address,
    phone: phone,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
    userId: userId,
    status: status,
  })
    .then((data) => {
      res.status(200).json({ message: "Đặt hàng thành công", data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//Lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
  await OrderModel.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//Lấy đơn hàng theo id
const getOrderById = async (req, res) => {
  var id = req.params.id;
  await OrderModel.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//Cập nhật đơn hàng
const updateOrder = async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  console.log("Updating order with ID:", id, "to status:", status);

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }

    res
      .status(200)
      .json({ message: "Cập nhật đơn hàng thành công", data: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error); // Log lỗi
    res.status(500).json({ message: "Có lỗi xảy ra", error });
  }
};

//Xóa đơn hàng
const deleteOrder = async (req, res) => {
  var id = req.params.id;
  await OrderModel.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ message: "Xóa đơn hàng thành công", data });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getOrderByUser = async (req, res) => {
  const userId = req.params.userId;

  // Kiểm tra xem userId có hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "User ID không hợp lệ" });
  }

  try {
    const orders = await OrderModel.find({ userId })
      .populate("OrderItem.bookId", "book_name") // Thêm populate để lấy tên sách
      .exec();

    // Kiểm tra xem có đơn hàng nào không
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng cho người dùng này" });
    }

    // Trả về danh sách đơn hàng
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Có lỗi xảy ra", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderByUser,
};
