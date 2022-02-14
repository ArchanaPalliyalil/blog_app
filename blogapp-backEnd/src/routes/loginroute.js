const express = require("express");
const loginRouter = express.Router();
const userdata = require("../model/UserModel");

loginRouter.post("/", function (req, res) {
  var userFromUI = {
    email: req.body.email, // Part#2 Point10
    password: req.body.password,
  };

  console.log(userFromUI);
  var flag = false;
  userdata.find().then(function (usersFromDB) {
    for (let i = 0; i < usersFromDB.length; i++) {
      if (
        userFromUI.email == usersFromDB[i].email &&
        userFromUI.password == usersFromDB[i].password
      ) {
        flag = true;
        break;
      } else {
        flag = false;
      }
    }


    if (flag == true) {
        console.log("User credentials has been verified")
      res.status(200).json(userFromUI);
    } else {
        console.log("User credentials are not matching")
      res.status(401).json(userFromUI);
    }
  });
});

module.exports = loginRouter;
