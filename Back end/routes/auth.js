const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fetchuser= require('../middleware/fetchuser');

const JWT_SECRET = `HEHE$hohoh1234`;



//ROUTE 1 : Creating a user using  POST "api/auth/createuser" NO login req
router.post(
  "/createuser",
  [
    body("name", "Name must be of Grater then 2 chars").isLength({ min: 2 }),
    body("email", "Invalild E-mail ID").isEmail(),
    body("password", "Password must be of 7 chars").isLength({ min: 7 }),
  ],
  async (req, res) => {
    //Data Validation
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //check user exist or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //user exists
        return res.status(400).json({ success,errors: "User alerad exsist" });
      }
      // else store the data

      let salt = await bcrypt.genSaltSync(10);
      let encPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, token });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong!");
    }
  }
);

//ROUTE 2 : User login   (login not req)

router.post(
  "/login",
  [
    body("email", "Invalild E-mail ID").isEmail(),
    body("password", "Invalid credentials").exists(),
  ],
  async (req, res) => {
    //Data Validation
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email, password} = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({success, errors: "Invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success,errors: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,token} );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong!");
    }
  }
);

//ROUTE 3 : Login and get user info
router.post(
  "/getuser",fetchuser,async (req, res) => {try {
    userId= req.user.id;
    console.log(userId);
    const user= await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong!");
  }});











module.exports = router;
