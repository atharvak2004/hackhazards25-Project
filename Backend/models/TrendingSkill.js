const mongoose = require('mongoose');

const trendingSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0 }, 
  source: { type: String }, 
  fetchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrendingSkill', trendingSkillSchema);
