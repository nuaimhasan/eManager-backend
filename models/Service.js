const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    image: {
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

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
