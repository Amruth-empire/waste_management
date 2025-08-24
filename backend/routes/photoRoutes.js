import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import protect from "../middleware/authMiddleware.js"; // <-- import your auth middleware

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer instance
const upload = multer({ storage });

// CREATE (Upload photo) - PROTECTED
router.post("/", protect, upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  res.json({
    success: true,
    message: "Photo uploaded successfully",
    filePath: `/uploads/${req.file.filename}`, // this will be used by frontend
    user: req.user?._id, // you can store which user uploaded this
  });
});

export default router;
