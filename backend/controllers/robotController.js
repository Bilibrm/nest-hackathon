const Robot = require("../models/Robot");

// GET all robots
const getRobots = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.json(robots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching robots", error });
  }
};

// POST new robot
const createRobot = async (req, res) => {
  const { name, currentPosition } = req.body;

  try {
    const robot = new Robot({
      name,
      currentPosition,
    });

    await robot.save();
    res.status(201).json(robot);
  } catch (error) {
    res.status(400).json({ message: "Error creating robot", error });
  }
};

// PUT update robot by ID
const updateRobot = async (req, res) => {
  const { id } = req.params;
  const { status, currentPosition, task, batteryLevel } = req.body;

  try {
    const robot = await Robot.findByIdAndUpdate(
      id,
      { status, currentPosition, task, batteryLevel },
      { new: true }
    );

    if (!robot) {
      return res.status(404).json({ message: "Robot not found" });
    }

    res.json(robot);
  } catch (error) {
    res.status(400).json({ message: "Error updating robot", error });
  }
};

module.exports = {
  getRobots,
  createRobot,
  updateRobot,
};
