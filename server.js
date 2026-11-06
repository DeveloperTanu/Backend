const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true },
);

User = mongoose.model("User", userSchema);

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = 3000;

app.use(express.json());

const checkRequest = (req, res, next) => {
  console.log("Request received.");

  next();
}

app.get("/", checkRequest, (req, res) => {
  res.send("/");
});

app.post("/login", checkRequest, async (req, res) => {
  const { email, password } = req.body;

  const userPassword = await User.findOne({ password });
  
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

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
      token,
    });
  }

});

app.get("/signup", checkRequest, async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log("Server is running >>>>");
});

//firebase.