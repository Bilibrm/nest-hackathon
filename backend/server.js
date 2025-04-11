const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/robots", require("./routes/robotRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Warehouse Robot Backend is Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
