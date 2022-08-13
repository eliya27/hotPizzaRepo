const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const pizzaUsers = require("../model/User");
const { RegisterValidation, LoginValidation } = require("../validation");

router.post("/enroll", async (req, res) => {
  //Validation
  const { error } = RegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking user if already exist
  const user_check = await pizzaUsers.findOne({ email: req.body.email });

  if (user_check) {
    return res.status(400).send("Email already exist");
  }

  //const mix_numb = await bcrypt.genSalt(10) --> (req.body.password, salt)
  const hashedPassw = await bcrypt.hash(req.body.password, 12);

  //Create a new User
  const pizzaAddict = new pizzaUsers({
    fullname: req.body.fullname,
    email: req.body.email,
    //password: req.body.password,
    password: hashedPassw,
  });
  try {
    const savedUser = await pizzaAddict.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
  //res.send("Hello enroll page");
});

router.post("/login", async (req, res) => {
  //Validation
  const { error } = LoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking user if already exist
  const login_user = await pizzaUsers.findOne({ email: req.body.email });

  if (!login_user) {
    return res.status(400).send("Email doesn't exist");
  }

  const passwCompare = await bcrypt.compare(
    req.body.password,
    login_user.password
  );

  if (!passwCompare) {
    return res.status(400).send("Password Invalid");
  }

  //res.json({ name: req.body.password, email: req.body.email });

  //Create and Assign token
  const token = jwt.sign({ _id: login_user._id }, process.env.TOKEN_SECRET);
  res.header("auth_token", token).send(token);
});

module.exports = router;
