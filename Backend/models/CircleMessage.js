const mongoose = require("mongoose");

const circleMessageSchema = new mongoose.Schema({
  circle: { type: mongoose.Schema.Types.ObjectId, ref: "Circle", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("CircleMessage", circleMessageSchema);
