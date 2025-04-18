const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const User = require("../models/User"); 
const protect = require("../middleware/authMiddleware");


// GET all booked sessions (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { mentorId, userId } = req.query;
    const filter = {};
    if (mentorId) filter.mentorId = mentorId;
    if (userId) filter.userId = userId;

    const sessions = await Session.find(filter).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Server error while fetching sessions" });
  }
});

// GET sessions for logged-in user
router.get("/mine", protect, async (req, res) => {
  try {
    const user = req.user;
    let sessions;

    if (user.role === "student") {
      sessions = await Session.find({ userId: user._id }).sort({ date: 1, time: 1 });
    } else if (user.role === "mentor") {
      sessions = await Session.find({ mentorId: user._id }).sort({ date: 1, time: 1 });
    } else {
      return res.status(403).json({ message: "Unknown role" });
    }

    res.json(sessions);
  } catch (err) {
    console.error("Fetching sessions error:", err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
});

// Book a new session
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can book sessions." });
  }

  const { mentorId, date, time, message } = req.body;

  if (!mentorId || !date || !time) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Validate mentor exists and is actually a mentor
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(400).json({ message: "Invalid mentor." });
    }

    // Prevent booking in the past
    const now = new Date();
    const sessionDateTime = new Date(`${date}T${time}`);
    if (sessionDateTime < now) {
      return res.status(400).json({ message: "Cannot book a session in the past." });
    }

    // Check for existing booking
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

    const session = new Session({
      userId: req.user._id,
      userName: req.user.name,
      mentorId,
      mentorName: mentor.name,
      date,
      time,
      message,
    });

    const saved = await session.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
});

module.exports = router;
