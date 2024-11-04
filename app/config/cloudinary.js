const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "cloud_name",
  api_key: "api_key",
  api_secret: "api_secret", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
