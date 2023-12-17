const mongoose = require("mongoose");

const serviceBannerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
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
});

const ServiceBanner = mongoose.model("ServiceBanner", serviceBannerSchema);
module.exports = ServiceBanner;
