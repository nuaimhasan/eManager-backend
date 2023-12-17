const mongoose = require("mongoose");
const { Types } = require("mongoose");

const jobApplyFormSchema = mongoose.Schema(
  {
    positionName: {
      type: String,
      required: true,
    },
    jobId: {
      type: Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: String,
      required: true,
    },
    expectedSalary: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const JobApplyForm = mongoose.model("JobApplyForm", jobApplyFormSchema);
module.exports = JobApplyForm;
