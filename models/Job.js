const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
