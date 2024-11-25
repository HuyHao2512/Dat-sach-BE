const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  // Lấy token từ header Authorization
  let token = req.headers["authorization"]; // Chú ý là chữ "a" trong 'authorization' có thể viết in thường, không phân biệt chữ hoa chữ thường trong header HTTP

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Nếu có token, loại bỏ "Bearer " ở đầu
  token = token.split(" ")[1]; // Loại bỏ từ "Bearer " trước token, nếu có

  // Xác thực token với secret key
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      // Nếu token không hợp lệ hoặc hết hạn, trả về lỗi
      return catchError(err, res);
    }

    // Lưu thông tin người dùng vào request
    req.userId = decoded.id;
    next(); // Tiếp tục đến middleware tiếp theo
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
