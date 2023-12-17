const mongoose = require("mongoose");

const careerBannerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CareerBanner = mongoose.model("CareerBanner", careerBannerSchema);
module.exports = CareerBanner;
