const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const signUpRoute = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSalt(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await mongoose.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      messager: "User created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong | Internal server error.",
    });
  }
};

module.exports = signUpRoute;