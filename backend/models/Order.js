const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  itemSku: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fulfilledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Robot",
    default: null,
  },
});

module.exports = mongoose.model("Order", orderSchema);