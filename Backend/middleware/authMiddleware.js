const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Mentor = require("../models/Mentor");


const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if header starts with Bearer
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      // 2. Verify the token
      const decoded = jwt.verify(token, "your_jwt_secret");

      // 3. Get user from database (excluding password)
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      } 

      // 4. Attach user to request
      req.user = user;

      if (user.role === "mentor") {
        const existingMentor = await Mentor.findOne({ userId: user._id });
        if (!existingMentor) {
          await Mentor.create({
            userId: user._id,
            name: user.name,
            bio: "New mentor, bio coming soon ",
            expertise: ["General"],
            available: true,
            profileImage: "https://via.placeholder.com/150"
          });
        }
      }


      // 5. Continue
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
