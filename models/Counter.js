const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
