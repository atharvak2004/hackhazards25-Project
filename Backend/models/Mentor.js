const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true, 
    },
    name: { type: String, required: true },
    expertise: { type: [String], required: true },
    bio: String,
    available: { type: Boolean, default: true },
    profileImage: String,
  },
  { timestamps: true }
);

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
