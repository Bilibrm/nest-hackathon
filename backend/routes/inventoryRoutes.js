const express = require("express");
const router = express.Router();
const {
  getInventory,
  createItem,
  updateItem,
} = require("../controllers/inventoryController");

router.get("/", getInventory);
router.post("/", createItem);
router.put("/:sku", updateItem);

module.exports = router;
