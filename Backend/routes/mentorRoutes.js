const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

//Get all mentors
//GET /api/mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    const filtered = [];

    for (let mentor of mentors) {
      const userExists = await User.findById(mentor.userId);
      if (userExists) {
        filtered.push(mentor);
      } else {
        await Mentor.deleteOne({ _id: mentor._id });
      }
    }

    res.json(filtered);
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ message: "Failed to load mentors" });
  }
});


router.get("/me", protect, async (req, res)=>{
  if (req.user.role !== "mentor") {
    return res.status(403).json({ message: "Only mentors can view this route." });
  }

  try {
    const mentor = await Mentor.findOne({ userId: req.user._id });
    if (!mentor) {
      return res.status(404).json({ message: "Mentor profile not found." });
    }
    res.json(mentor);
  } catch (err) {
    console.error("Error fetching mentor profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//Add a mentor
//POST /api/mentors
router.post("/", async (req, res) => {
  const { name, expertise, bio, available, profileImage } = req.body;
  try {
    const mentor = new Mentor({
      name,
      expertise,
      bio,
      available,
      profileImage,
    });

    const savedMentor = await mentor.save();
    res.status(201).json(savedMentor);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/me", protect, async (req, res) => {
  // Restrict to mentors only
  if (req.user.role !== "mentor") {
    return res.status(403).json({ message: "Only mentors can update their profile." });
  }

  const updates = {
    bio: req.body.bio,
    expertise: req.body.expertise,
    available: req.body.available,
    profileImage: req.body.profileImage,
  };

  try {
    const mentor = await Mentor.findOneAndUpdate(
      { userId: req.user._id },
      { $set: updates },
      { new: true }
    );

    if (!mentor) {
      return res.status(404).json({ message: "Mentor profile not found." });
    }

    res.json(mentor);
  } catch (error) {
    console.error("Mentor profile update error:", error);
    res.status(500).json({ message: "Failed to update mentor profile." });
  }
});

module.exports = router;
