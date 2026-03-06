const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// env already loaded by app.js

const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");

/* ── POST /api/auth/register ── */
router.post("/register", verifyToken, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email & password are required" });

    if (await User.findOne({ email }))
      return res.status(409).json({ message: "Email already registered" });

    /* Security: only an authenticated super-admin may assign super-admin role.
       Sub-admins can create sub-admin and member accounts.
       Regular members can only create member accounts. */
    let assignedRole = "member"; // default

    const currentUserRole = req.user.role;

    if (role === "super-admin") {
      // Only super-admin can create super-admin accounts
      if (currentUserRole === "super-admin") {
        assignedRole = "super-admin";
      } else {
        assignedRole = "member";
      }
    } else if (role === "sub-admin") {
      // Super-admin and sub-admin can create sub-admin accounts
      if (currentUserRole === "super-admin" || currentUserRole === "sub-admin") {
        assignedRole = "sub-admin";
      } else {
        assignedRole = "member";
      }
    } else {
      // Anyone authenticated can create member accounts
      assignedRole = "member";
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: assignedRole,
    });

    res.status(201).json({ message: "User created", user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── POST /api/auth/login ── */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── GET /api/auth/me ── (protected) */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── POST /api/auth/set-cookie ── (set httpOnly cookie) */
router.post("/set-cookie", (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: "Cookie set successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── POST /api/auth/logout ── (clear cookie) */
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
