const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Amit@100";
// Create a user using POST "/api/auth/createuser", doesn't require authentication
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // Check if the User Exist

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "User already Exist" });
      }
      const salt = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(req.body.password, salt);
      //Create a User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const deta = {
        user: {
          id: user.id,
        },
      };
      let authtoken = jwt.sign(deta, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);
// Login Exististing "/api/auth/login"  User
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "enter valid password").exists(),
  ],
  async (req, res) => {
    let success = false; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({success,  error: "Please type correct credantials" });
      }
      const comparePass = await bcryptjs.compare(password, user.password);
      if (!comparePass) {
        success = false;
        return res
          .status(400)
          .json({ success,  error: "Please type correct credantials" });
      }
      const deta = {
        user: {
          id: user.id,
        },
      };
      let authtoken = jwt.sign(deta, JWT_SECRET);
      success = true;
      res.json({ success,  authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);
// Get User Deta "/api/auth/getuser"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
