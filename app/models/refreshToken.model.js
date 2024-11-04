const mongoose = require("mongoose");
const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  // let _token = uuidv4();
  let _token = uuidv4();
  let encodedToken = jwt.sign({ token: _token }, config.secret);
  let _object = new this({
    user: user._id,
    token: encodedToken,
    expiryDate: expiredAt.getTime(),
  });

  console.log(_object);

  let refreshToken = await _object.save();

  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;
