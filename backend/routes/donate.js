import express from "express";

const router = express.Router();

// POST donation
router.post("/", async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save donation to DB here (example only)
    // const donation = new Donation({ name, email, amount });
    // await donation.save();

    res.json({
      success: true,
      message: "Donation received successfully",
      donation: { name, email, amount },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
