const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "user already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            }); //salting: add random string to pass before password is hashed

            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Created User successfully!",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(501).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid Credentials",
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            process.env.JWT_KEY, //it is the private key used for the hashing
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "Successful Login",
            token: token,
          });
        }

        return res.status(401).json({
          message: "Login Failed!!",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:userId", checkAuth, (req, res) => {
  const id = req.params.userId;
  User.findByIdAndRemove({ _id: id })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User Not found",
        });
      } else {
        return res.status(200).json({
          message: "User Deleted",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
