const mongoose = require("mongoose");

const jobBenefitSchema = mongoose.Schema({
  title: {
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

const JobBenefit = mongoose.model("JobBenefit", jobBenefitSchema);
module.exports = JobBenefit;
