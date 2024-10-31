const mongoose = require("mongoose");

const screenshotSchema = new mongoose.Schema({
  url: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Screenshot = mongoose.model("Screenshot", screenshotSchema);

module.exports = Screenshot;
