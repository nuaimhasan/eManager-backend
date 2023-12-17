const mongoose = require("mongoose");

const logoSchema = mongoose.Schema({
  logo: {
    type: String,
  },
});

const Logo = mongoose.model("Logo", logoSchema);

module.exports = Logo;
