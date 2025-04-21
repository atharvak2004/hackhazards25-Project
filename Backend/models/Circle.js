const mongoose = require("mongoose");

const circleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isPublic: {
    type: Boolean,
    default: false
  }  
}, { timestamps: true });

module.exports = mongoose.model("Circle", circleSchema);
