const mongoose = require("mongoose");

const robotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: "idle" }, // idle, busy, error
  currentPosition: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  task: {
    type: String,
    default: null,
  },
  batteryLevel: {
    type: Number,
    default: 100,
  },
});

module.exports = mongoose.model("Robot", robotSchema);
