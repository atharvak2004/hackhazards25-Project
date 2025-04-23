const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');  // Ensure this is correctly required
const Mentor = require('../models/Mentor');
const Session = require('../models/Session');  // Ensure you have the correct Session model

// Booking route
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can book sessions." });
  }

  const { mentorId, date, time, message } = req.body;

  // Ensure mentorId is treated as ObjectId
  const ObjectId = require('mongoose').Types.ObjectId;

  if (!ObjectId.isValid(mentorId)) {
    return res.status(400).json({ message: "Invalid mentor ID." });
  }

  try {
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(400).json({ message: "Mentor not found." });
    }

    // Create and save the session
    const session = new Session({
      userId: req.user._id,
      userName: req.user.name,
      mentorId,
      mentorName: mentor.name,
      date,
      time,
      message,
    });

    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
});

module.exports = router;
