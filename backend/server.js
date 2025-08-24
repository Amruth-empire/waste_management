import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import photoRoutes from "./routes/photoRoutes.js"; // ✅ import photo routes
import donateRoutes from "./routes/donate.js";


dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // Vite dev server
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder for serving uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes); // ✅ mount photo routes
app.use("/api/donate", donateRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,

    message: err.message || "Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
