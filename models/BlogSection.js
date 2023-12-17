const mongoose = require("mongoose");

const blogSectionSchema = mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
});

const BlogSection = mongoose.model("BlogSection", blogSectionSchema);
module.exports = BlogSection;
