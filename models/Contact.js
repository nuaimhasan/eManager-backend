const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  phone: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  youtubeLink: {
    type: String,
  },
  linkedinLink: {
    type: String,
  },
});

const ContactUs = mongoose.model("ContactUs", contactSchema);
module.exports = ContactUs;
