const express = require("express");
const router = express.Router();
const Circle = require("../models/Circle");
const CircleMessage = require("../models/CircleMessage");
const protect = require("../middleware/authMiddleware");

// Create a circle
router.post("/", protect, async (req, res) => {
  const { name } = req.body;

  const newCircle = await Circle.create({
    name,
    createdBy: req.user._id,
    members: [req.user._id],
  });

  res.status(201).json(newCircle);
});

// Add member to circle
router.post("/:id/add", protect, async (req, res) => {
  const { userId } = req.body;
  const circle = await Circle.findById(req.params.id);

  if (!circle) return res.status(404).json({ message: "Circle not found" });

  if (!circle.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: "Only the creator can add members" });
  }

  if (!circle.members.includes(userId)) {
    circle.members.push(userId);
    await circle.save();
  }

  res.json(circle);
});

// Get circles the user is in
router.get("/mine", protect, async (req, res) => {
  const circles = await Circle.find({ members: req.user._id }).populate("members", "name email");
  res.json(circles);
});

// Get messages for a circle
router.get("/:id/messages", protect, async (req, res) => {
  const circleId = req.params.id;
  if (!circleId) return res.status(400).json({ message: "Circle ID is required" });

  console.log("Fetching messages for circle ID:", circleId); // ✅ debug

  try {
    const messages = await CircleMessage.find({ circle: circleId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error("Message fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// Get public circles

router.get("/public", protect, async (req, res) => {
  try {
    let circle = await Circle.findOne({ isPublic: true });

    if (!circle) {
      circle = await Circle.create({
        name: "🌍 Public Circle",
        createdBy: req.user._id,
        members: [req.user._id],
        isPublic: true,
      });
    }

    // Auto-add user if not already a member
    if (!circle.members.includes(req.user._id)) {
      circle.members.push(req.user._id);
      await circle.save();
    }

    res.json(circle);
  } catch (err) {
    console.error("Public circle error:", err.message);
    res.status(500).json({ message: "Failed to get public circle" });
  }
});


// Send message in a circle
router.post("/:id/messages", protect, async (req, res) => {
  const circleId = req.params.id;
  const { content } = req.body;

  if (!circleId) return res.status(400).json({ message: "Circle ID is required" });
  if (!content) return res.status(400).json({ message: "Message content is required" });

  console.log("Sending message to circle ID:", circleId); 

  try {
    const message = await CircleMessage.create({
      circle: circleId,
      sender: req.user._id,
      content,
    });

    const populated = await message.populate("sender", "name");
    res.status(201).json(populated);
  } catch (err) {
    console.error("Message send error:", err.message);
    res.status(500).json({ message: "Failed to send message" });
  }
});

router.post('/:id/join', protect, async (req, res) => {
    const circleId = req.params.id;
    const userId = req.user._id;
    console.log("👉 Join route hit with ID:", req.params.id);
    try {
      const circle = await Circle.findById(circleId);
      if (!circle) return res.status(404).json({ message: "Circle not found" });
  
      // Check if already a member
      if (circle.members.includes(userId)) {
        return res.status(400).json({ message: "Already a member" });
      }
  
      circle.members.push(userId);
      await circle.save();
  
      res.json({ message: "Joined successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to join" });
    }
  });
  

module.exports = router;
