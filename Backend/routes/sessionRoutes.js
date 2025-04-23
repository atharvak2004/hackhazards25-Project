const express = require('express');
const router = express.Router(); // This defines the router

const { protect } = require('../middleware/auth'); // Assuming you have some middleware for auth
const Session = require('../models/Session'); // Import Session model if needed
const Mentor = require('../models/Mentor'); // Import Mentor model if needed

// Your route handlers here
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can book sessions." });
  }

  const { mentorId, date, time, message } = req.body;
  const ObjectId = require('mongoose').Types.ObjectId;

  if (!ObjectId.isValid(mentorId)) {
    return res.status(400).json({ message: "Invalid mentor ID." });
  }

  try {
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(400).json({ message: "Mentor not found." });
    }

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

module.exports = router; // Export the router
