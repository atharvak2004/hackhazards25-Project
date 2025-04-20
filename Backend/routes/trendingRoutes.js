// routes/trendingRoutes.js
const express = require('express');
const router = express.Router();
const TrendingSkill = require('../models/TrendingSkill');

// GET /api/trends - Get top trending skills
router.get('/', async (req, res) => {
    console.log("GET /api/trends hit");
    try {
      const trends = await TrendingSkill.find().sort({ count: -1 }).limit(10);
      console.log("Mongo results:", trends);
      res.json(trends);
    } catch (error) {
      console.error("Mongo error:", error);
      res.status(500).json({ error: 'Failed to fetch trending skills' });
    }
  });

module.exports = router;
