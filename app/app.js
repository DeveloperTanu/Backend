const express = require("express");
const app = express();
const signUpRoute = require("../routes/signup.route");
const loginRoute = require("../routes/login.route");
const checkRequest = require("../middlewares/app.middleware");

app.use(express.json());

app.get("/", checkRequest, (req, res) => {
  res.send("/");
});

app.get("/signup", signUpRoute);
app.post("/login", loginRoute);

module.exports = app;