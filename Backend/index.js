const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

connectDB();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/mentors", require("./routes/mentorRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/trends", require("./routes/trendingRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/circles", require("./routes/circleRoutes"));

app.get("/", (req, res) => res.send("API is running"));

// ✅ Fetch Tech News Function
const fetchTechNews = async () => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category: "technology",
        language: "en",
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching tech news:", error.message);
    return [];
  }
};

// ✅ Socket.IO Logic
io.on("connection", (socket) => {
  console.log("Client connected");

  const sendNews = async () => {
    const news = await fetchTechNews();
    socket.emit("techNews", news);
  };

  sendNews(); 
  const interval = setInterval(sendNews, 60000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
