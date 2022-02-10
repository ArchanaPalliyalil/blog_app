const express = require("express");
const signupRouter = express.Router();
const userdata = require("../model/UserModel");

signupRouter.post("/adduser", function (req, res) {
  var newuser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const user = new userdata(newuser);
  user.save();
  console.log(
    " A new user has been added to the database successfully : " + user
  );
  res.status(201).json(user);
});

module.exports = signupRouter;
