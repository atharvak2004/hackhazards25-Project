const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");
const User = require("../models/User");

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

module.exports = router;
