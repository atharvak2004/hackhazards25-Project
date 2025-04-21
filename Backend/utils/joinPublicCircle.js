const Circle = require("../models/Circle");

async function joinPublicCircle(userId) {
  const publicCircle = await Circle.findOne({ isPublic: true });

  if (publicCircle && !publicCircle.members.includes(userId)) {
    publicCircle.members.push(userId);
    await publicCircle.save();
  }
}

module.exports = joinPublicCircle;
