const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  profileDoc: {
    type: String,
  },
});

const AboutUs = mongoose.model("AboutUs", aboutSchema);
module.exports = AboutUs;
