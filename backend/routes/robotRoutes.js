const express = require("express");
const router = express.Router();
const {
  getRobots,
  createRobot,
  updateRobot,
} = require("../controllers/robotController");

// Make sure these handlers are valid functions
router.get("/", getRobots); // Should be a function
router.post("/", createRobot); // Should be a function
router.put("/:id", updateRobot); // Should be a function

module.exports = router;
