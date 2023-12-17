const mongoose = require("mongoose");

const whyChooseSchema = mongoose.Schema({
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

const WhyChoose = mongoose.model("WhyChoose", whyChooseSchema);
module.exports = WhyChoose;
