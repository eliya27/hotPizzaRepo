const express = require("express");
const nodemon = require("nodemon");
const ejs = require("ejs");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

//Import routes
const authRoutes = require("./routes/auth");
const normalRoutes = require("./routes/pages");
const { urlencoded } = require("express");

dotenv.config();

const PORT = process.env.PORT || 3535;

const app = express();

//Database settings
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("MongoDB connected");
  });

//Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));

//Routes Middleware
app.use("/api/", normalRoutes);
app.use("/api/user/", authRoutes);

//template system
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

//Port settings
app.listen(PORT, (req, res) => {
  console.log(`PORT ${PORT} is running`);
});
