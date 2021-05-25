const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post(
  "/",
  [
    check("firstname", "Please add first  name").not().isEmpty(),
    check("lastname", "Please add  last name").not().isEmpty(),
    check("email", "Please include an valid email").isEmail(),
    check("usertype", "Please include a valid usertype").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          msg: "User already exists.",
        });
      }

      user = new User(req.body);

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          const response = {
            message: `Created user of id '${user.id}' successfully`,
            user: {
              _id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              usertype: user.usertype,
              token,
            },
          };
          return res.status(201).json({ response });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then((user) => {
      const response = {
        user: user,
      };
      res.status(200).json(user);
    })
    .catch((error) => {
      // return error if there's any
      res
        .status(500)
        .json({ message: `Unable to GET User of id '${id}'`, error: error });
    });
});

module.exports = router;
