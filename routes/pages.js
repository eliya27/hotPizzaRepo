const router = require("express").Router();
const verify = require("./verifyToken");
//const PizzaUsers = require("../model/User");

/* router.get("/", (req, res) => {
  res.send("Heloo");
}); */
router.get("/", (req, res) => {
  res.render("index", { title: "Home 🍲" });
});

router.get("/enroll", (req, res) => {
  res.render("enroll", { title: "enroll 🍲" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "login 🍲" });
});

router.get("/main", verify, (req, res) => {
  try {
    res.render("main", { title: "main 🍲" });
  } catch (err) {
    res.status(400).status("Dont have access");
  }
});

module.exports = router;
