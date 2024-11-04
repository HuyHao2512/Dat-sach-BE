const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
const Book = require("./app/models/book.model");
const Order = require("./app/models/order.model");
const Cart = require("./app/models/cart.model");
const Category = require("./app/models/category.model");
const bodyParser = require("body-parser");
const cloudinary = require("./app/config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "book",
  allowedFormats: ["jpg", "png"],
  stransformation: [{ width: 500, height: 500, crop: "limit" }],
});
const upload = multer({
  storage: storage,
});
var corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// app.post(
//   "/upload",
//   upload.fields([{ name: "img", maxCount: 1 }]),
//   (req, res) => {
//     const link_img = req.files["img"][0];
//     res.send(link_img);
//   }
// );
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file để upload" });
  }
  // Lấy URL từ Cloudinary
  const imageUrl = req.file.path;
  res.status(200).json({ imageUrl });
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const categoryRouter = require("./app/routes/categoryRoutes");
app.use("/api/category", categoryRouter);
const bookRouter = require("./app/routes/bookRoutes");
app.use("/api/book", bookRouter);
const cartRouter = require("./app/routes/cartRoutes");
app.use("/api/cart", cartRouter);
const orderRouter = require("./app/routes/orderRoutes");
app.use("/api/order", orderRouter);
const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Store" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
