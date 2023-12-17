const mongoose = require("mongoose");

const serviceSectionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ServiceSection = mongoose.model("ServiceSection", serviceSectionSchema);
module.exports = ServiceSection;
