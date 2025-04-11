const Order = require("../models/Order");

// GET all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("fulfilledBy", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// POST new order
const createOrder = async (req, res) => {
  const { itemSku, quantity } = req.body;

  try {
    const order = new Order({ itemSku, quantity });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error });
  }
};

// PUT update order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, fulfilledBy } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status, fulfilledBy },
      { new: true }
    ).populate("fulfilledBy", "name");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Error updating order", error });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
};
