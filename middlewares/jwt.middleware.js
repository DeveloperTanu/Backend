const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const createToken = (user) => {
    return jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  ); 
};

module.exports = createToken;