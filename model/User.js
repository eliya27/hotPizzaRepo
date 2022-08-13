const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    max: 12,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    min: 2,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PizzaLovers", userSchema);
