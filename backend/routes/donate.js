import express from "express";
import protect from "../middleware/authMiddleware.js"; // <-- import your auth middleware

const router = express.Router();

// POST donation (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Example: Save donation to DB
    // const donation = new Donation({ 
    //   user: req.user._id, // store logged-in user reference
    //   name, 
    //   email, 
    //   amount 
    // });
    // await donation.save();

    res.json({
      success: true,
      message: "Donation received successfully",
      donation: { name, email, amount, user: req.user?._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
