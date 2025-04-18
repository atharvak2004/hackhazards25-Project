const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const mentorRoutes = require("./routes/mentorRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
// const trendsRoutes = require("./routes/trendsRoutes");


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/mentors", mentorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
// app.use("/api/trends", trendsRoutes);


app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
