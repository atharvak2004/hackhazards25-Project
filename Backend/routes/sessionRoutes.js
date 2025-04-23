const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const Mentor = require("../models/Mentor");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

// POST to book a session
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can book sessions." });
  }

  const { mentorId, date, time, message } = req.body;

  if (!mentorId || !date || !time) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Find mentor using mentorId
    const mentor = await Mentor.findOne({ userId: mentorId });

    if (!mentor) {
      return res.status(400).json({ message: "Invalid mentor." });
    }

    const sessionDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    // Validate date and time
    if (isNaN(sessionDateTime.getTime())) {
      return res.status(400).json({ message: "Invalid date or time format." });
    }

    if (sessionDateTime < now) {
      return res.status(400).json({ message: "Cannot book a session in the past." });
    }

    // Check if the student already booked this mentor for the same time
    const existingSession = await Session.findOne({
      userId: req.user._id,
      mentorId,
      date,
      time,
    });

    if (existingSession) {
      return res.status(409).json({
        message: "You already booked this mentor at this date and time.",
      });
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
