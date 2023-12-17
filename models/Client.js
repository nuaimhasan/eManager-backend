const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
