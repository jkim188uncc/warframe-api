import express from "express";
import dotenv from "dotenv";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc3NDAzNzQ4LCJleHAiOjE3Nzc0MDczNDh9.h-5ITNymVupPKkWOSbKs33tWd8HsZtEnh80qLAr8gCY

dotenv.config();

const { default: relicRoutes } = await import("./routes/relicRoutes.js");
const { default: authRoutes } = await import("./routes/authRoutes.js");
const { default: rewardRoutes } = await import("./routes/rewardRoutes.js");

const app = express();

app.use(express.json());

app.use("/api/relics", relicRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/rewards", rewardRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

console.log("DB URL:", process.env.DATABASE_URL);