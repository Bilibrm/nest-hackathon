const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  location: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
