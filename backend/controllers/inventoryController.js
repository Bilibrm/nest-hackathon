const Inventory = require("../models/Inventory");

// GET all inventory items
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error });
  }
};

// POST new item
const createItem = async (req, res) => {
  const { name, sku, quantity, location } = req.body;

  try {
    const item = new Inventory({ name, sku, quantity, location });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "Error creating item", error });
  }
};

// PUT update item by SKU
const updateItem = async (req, res) => {
  const { sku } = req.params;
  const { quantity, location } = req.body;

  try {
    const item = await Inventory.findOneAndUpdate(
      { sku },
      { quantity, location },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Error updating item", error });
  }
};

module.exports = {
  getInventory,
  createItem,
  updateItem,
};
