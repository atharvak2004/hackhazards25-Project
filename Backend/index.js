const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

dotenv.config(); // Load environment variables from .env
connectDB(); // Connect to the database (make sure your DB connection is working)

const app = express();
const server = http.createServer(app);

// ✅ Setup CORS
app.use(cors({
  origin: [
    "http://localhost:5173", // Local dev
    "https://skillora-two.vercel.app/" // Production URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json()); // For parsing JSON requests

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://skillora-two.vercel.app/"
    ],
    methods: ["GET", "POST"],
  }
});

// ✅ Tech News with Socket.IO
const fetchTechNews = async () => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category: "technology",
        language: "en",
        apiKey: process.env.NEWS_API_KEY, // Your News API key from .env
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching tech news:", error.message);
    return [];
  }
};

// Emit tech news on every connection
io.on("connection", (socket) => {
  console.log("📡 New client connected");

  const sendNews = async () => {
    const news = await fetchTechNews();
    socket.emit("techNews", news); // Send news to the client
  };

  sendNews();
  const interval = setInterval(sendNews, 60000); // Fetch news every 60 seconds

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

// API Routes
app.use("/api/mentors", require("./routes/mentorRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/trends", require("./routes/trendingRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/circles", require("./routes/circleRoutes"));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
