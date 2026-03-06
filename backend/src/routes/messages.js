const express = require("express");
const router  = express.Router();
const Message = require("../models/Message");
const { verifyToken, adminOnly, superAdminOnly } = require("../middleware/auth");

/* POST /api/messages — public (contact form) */
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.status(400).json({ message: "All fields are required" });

    const msg = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: "Message sent", data: msg });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* GET /api/messages — admin */
router.get("/", verifyToken, adminOnly, async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* PUT /api/messages/:id — mark as read (admin) */
router.put("/:id", verifyToken, adminOnly, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { status: "read" }, { new: true });
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json(msg);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* DELETE /api/messages/:id — super-admin */
router.delete("/:id", verifyToken, superAdminOnly, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
