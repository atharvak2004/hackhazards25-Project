const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student"); 
const Circle = require("../models/Circle");


// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await user.save();

    // Auto-create mentor
    if (savedUser.role === "mentor") {
      const mentorExists = await Mentor.findOne({ userId: savedUser._id });
      if (!mentorExists) {
        await Mentor.create({
          userId: savedUser._id,
          name: savedUser.name,
          expertise: ["General"],
          bio: "New mentor – bio coming soon.",
          available: true,
          profileImage: "https://via.placeholder.com/150",
        });
      }
    }

    // Auto-create student
    if (savedUser.role === "student") {
      await Student.create({
        user: savedUser._id,
        bio: "",
        skills: [],
        profilePicture: "https://via.placeholder.com/150",
      });
    }

    // ✅ Auto-join public circle
    try {
      const publicCircle = await Circle.findOne({ isPublic: true });
      if (publicCircle && !publicCircle.members.includes(savedUser._id)) {
        publicCircle.members.push(savedUser._id);
        await publicCircle.save();
      }
    } catch (err) {
      console.error("Failed to auto-join public circle:", err);
    }

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
