const express = require("express");
const router = express.Router();
const axios = require("axios");

// Make sure to add your GROQ_API_KEY in your .env file
const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.post("/mentor-assist", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a helpful mentor assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err.response?.data || err.message);
    res.status(500).json({ message: "AI request failed." });
  }
});

module.exports = router;
