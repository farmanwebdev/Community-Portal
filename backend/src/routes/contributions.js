const express = require("express");
const router = express.Router();
const Contribution = require("../models/Contribution");
const { verifyToken, adminOnly, superAdminOnly } = require("../middleware/auth");

/* GET /api/contributions — public */
router.get("/", async (_req, res) => {
  try {
    const list = await Contribution.find().sort({ date: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* GET /api/contributions/:id */
router.get("/:id", async (req, res) => {
  try {
    const c = await Contribution.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Contribution not found" });
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* POST /api/contributions — admin */
router.post("/", verifyToken, adminOnly, async (req, res) => {
  try {
    const { contributorName, amount, purpose, date } = req.body;
    if (!contributorName || amount == null || !purpose)
      return res.status(400).json({ message: "contributorName, amount & purpose required" });

    const contribution = await Contribution.create({
      contributorName, amount, purpose,
      date: date || new Date(),
      addedBy: req.user._id,
    });
    res.status(201).json(contribution);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* PUT /api/contributions/:id — admin (sub-admin can only edit their own) */
router.put("/:id", verifyToken, adminOnly, async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);
    if (!contribution) return res.status(404).json({ message: "Contribution not found" });

    // Sub-admins can only edit their own contributions
    if (req.user.role === "sub-admin" && contribution.addedBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own contributions" });
    }

    const { contributorName, amount, purpose, date } = req.body;
    const allowed = {};
    if (contributorName !== undefined) allowed.contributorName = contributorName;
    if (amount !== undefined) allowed.amount = amount;
    if (purpose !== undefined) allowed.purpose = purpose;
    if (date !== undefined) allowed.date = date;

    const c = await Contribution.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true });
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* DELETE /api/contributions/:id — super-admin only */
router.delete("/:id", verifyToken, superAdminOnly, async (req, res) => {
  try {
    const c = await Contribution.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ message: "Contribution not found" });
    res.json({ message: "Contribution deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
