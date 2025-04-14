const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const protect = require("../middleware/authMiddleware");


// GET all booked sessions
router.get("/", async (req, res) => {
    try {
      const sessions = await Session.find().sort({ createdAt: -1 }); 
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Server error while fetching sessions" });
    }
  });

//Get sessions for logged-in user
//GET /api/sessions/mine
//Private
router.get("/mine", protect, async (req, res) => {
  try {
    const user = req.user;

    let sessions;

    if (user.role === "student") {
      sessions = await Session.find({ userId: user._id }).sort({ date: 1, time: 1 });
    } else if (user.role === "mentor") {
      sessions = await Session.find({ mentorName: user.name }).sort({ date: 1, time: 1 });
    } else {
      return res.status(403).json({ message: "Unknown role" });
    }

    res.json(sessions);
  } catch (err) {
    console.error("Fetching sessions error:", err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
});


//Book a new session
//POST /api/sessions
//Public
router.post("/", protect, async (req, res) => {
  const { mentorName, date, time, message } = req.body;
  const userId = req.user._id;
  const userName = req.user.name;

  if (!mentorName || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const session = new Session({
      userId,        // ✅ comes from verified JWT user
      userName,      // ✅ comes from verified JWT user
      mentorName,
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
