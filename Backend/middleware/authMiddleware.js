const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Mentor = require("../models/Mentor");
const dotenv = require("dotenv");
dotenv.config();

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve user data (excluding password)
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach user to request
      req.user = user;

      if (user.role === "mentor") {
        const existingMentor = await Mentor.findOne({ userId: user._id });

        // Create mentor profile only if not already created
        if (!existingMentor) {
          const defaultMentorData = {
            userId: user._id,
            name: user.name,
            bio: "New mentor, bio coming soon",
            expertise: ["General"],
            available: true,
            profileImage: "https://via.placeholder.com/150"
          };

          await Mentor.create(defaultMentorData);
        }
      }

      next();
    } catch (err) {
      console.error("JWT Error:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = protect;
