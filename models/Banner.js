const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
