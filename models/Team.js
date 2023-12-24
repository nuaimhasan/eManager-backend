const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
