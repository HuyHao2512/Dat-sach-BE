const CartModel = require("../models/cart.model");

const getAllCartItemByUserId = async (req, res) => {
  var userId = req.params.userId;
  await CartModel.find({ userId: userId })
    .populate("items.bookId")
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const addItemToCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // Giỏ hàng đã tồn tại, thêm sản phẩm vào giỏ
      const itemIndex = cart.items.findIndex((item) =>
        item.bookId.equals(bookId)
      );

      if (itemIndex > -1) {
        // Sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Sản phẩm chưa có trong giỏ hàng, thêm mới
        cart.items.push({ bookId, quantity });
      }
    } else {
      // Giỏ hàng chưa tồn tại, tạo mới giỏ hàng
      cart = new CartModel({
        userId,
        items: [{ bookId, quantity }],
      });
    }

    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Có lỗi xảy ra",
      error: error.message,
    });
  }
};
const removeItemFromCart = async (req, res) => {
  const { userId, bookId } = req.body; // Khai báo userId và bookId từ body

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).send("Giỏ hàng không tồn tại");
    }

    // Xóa item theo bookId
    cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
    await cart.save(); // Lưu lại giỏ hàng đã cập nhật

    return res.status(200).json(cart); // Trả lại giỏ hàng đã cập nhật
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi server");
  }
};

const updateItemInCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;
  await CartModel.find({ userId: userId });
  try {
    let cart = await CartModel.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex((item) =>
        item.bookId.equals(bookId)
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        return res.status(200).json({
          status: "success",
          message: "Cập nhật số lượng sản phẩm trong giỏ hàng thành công",
          cart,
        });
      } else {
        console.log("itemIndex", itemIndex);
        return res.status(404).json({
          status: "error",
          message: "Sản phẩm không tồn tại trong giỏ hàng",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Có lỗi xảy ra",
      error: error.message,
    });
  }
};
const removeUserCart = async (req, res) => {
  const { userId } = req.body;

  try {
    // Tìm giỏ hàng theo userId và đặt lại items thành mảng rỗng
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }, // Đặt lại danh sách sản phẩm thành rỗng
      { new: true } // Trả về giỏ hàng mới sau khi cập nhật
    );

    if (!cart) {
      return res.status(404).send("Giỏ hàng không tồn tại");
    }

    return res
      .status(200)
      .json({ message: "Xóa sản phẩm trong giỏ hàng thành công", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi server");
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
  getAllCartItemByUserId,
  removeUserCart,
};
