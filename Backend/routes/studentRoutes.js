const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

router.get("/me", protect, async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate("user", "name email");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/me", protect, async (req, res) => {
  const { name, bio, skills, profilePicture } = req.body;

  try {
    // ✅ Update user name
    await User.findByIdAndUpdate(req.user._id, { name });

    // ✅ Update student profile (or create if missing)
    const updatedStudent = await Student.findOneAndUpdate(
      { user: req.user._id },
      { bio, skills, profilePicture },
      { new: true, upsert: true }
    ).populate("user", "name email");

    res.json(updatedStudent);
  } catch (error) {
    console.error("Student update error:", error);
    res.status(500).json({ message: "Failed to update student profile" });
  }
});

module.exports = router;
