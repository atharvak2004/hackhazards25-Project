const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// ✅ Setup CORS to allow all origins, methods, and credentials
app.use(cors({
  origin: "*", // Allow all origins (Not recommended for production)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json()); // For parsing JSON requests

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (Not recommended for production)
    methods: ["GET", "POST"],
  }
});

// ✅ Tech News with Socket.IO
const fetchTechNews = async () => {
  try {
    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        topic: "technology",
        lang: "en",
        token: "5cf0858c46737b61b2e06c063b271356", // 🔐 Your GNews API key
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error("Error fetching tech news:", error.message);
    return [];
  }
};

io.on("connection", (socket) => {
  console.log("📡 New client connected");

  const sendNews = async () => {
    const news = await fetchTechNews();
    socket.emit("techNews", news);
  };

  sendNews();
  const interval = setInterval(sendNews, 300000); 

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running ");
});

// Example route setup (uncomment if needed)
app.use("/api/mentors", require("./routes/mentorRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/trends", require("./routes/trendingRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/circles", require("./routes/circleRoutes"));

// ✅ Start Server  
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
