const app = require("../app/app");
const User = require("../models/user.model");
const createToken = require("../middlewares/jwt.middleware");
const checkRequest = require("../middlewares/app.middleware");

const loginRoute = async (req, res) => {
  const { email, password } = req.body;

  const userPassword = await User.findOne({ password });
  
  token;
  
  if (password != userPassword) {
    return res.status(409).json({
      success: false,
      message: "Password is incorrect.",
    });
  }

  if (!email || !password) {
    return res.status(409).json({
      message: "name, email or password is required",
    });
  }

  if (email && password) {
    return res.status(200).json({
      success: true,
      message: "successfully logged in.",
      createToken,
    });
  }

};

module.exports = loginRoute;