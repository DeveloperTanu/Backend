const express = require("express");
const app = express();
const signUpRoute = require("../routes/signup.route");
const loginRoute = require("../routes/login.route");
const checkRequest = require("../middlewares/app.middleware");
const admin = require("../config/firebase");

app.use(express.json());

app.get("/", checkRequest, (req, res) => {
  res.send("/");
});

app.get("/signup", checkRequest, signUpRoute);
app.post("/login", checkRequest, loginRoute);

console.log("Firebase initialized:", admin.name === "[DEFAULT]");

module.exports = app;