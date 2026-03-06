const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { verifyToken, superAdminOnly, adminOnly } = require("../middleware/auth");

/* GET /api/users — list all (admin only) */
router.get("/", verifyToken, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* GET /api/users/:id */
router.get("/:id", verifyToken, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* PUT /api/users/:id — update role (super-admin only) */
router.put("/:id", verifyToken, superAdminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["super-admin", "sub-admin", "member"].includes(role))
      return res.status(400).json({ message: "Invalid role" });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* DELETE /api/users/:id (super-admin only, cannot delete self) */
router.delete("/:id", verifyToken, superAdminOnly, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString())
      return res.status(400).json({ message: "You cannot delete your own account" });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
