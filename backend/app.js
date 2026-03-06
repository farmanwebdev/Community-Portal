/* --------------------------------------------------------
   app.js  —  Express entry-point
   -------------------------------------------------------- */
const express  = require("express");
const cors     = require("cors");
const dotenv   = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

/* ── Routes ── */
app.use("/api/auth",          require("./src/routes/auth"));
app.use("/api/users",         require("./src/routes/users"));
app.use("/api/projects",      require("./src/routes/projects"));
app.use("/api/contributions", require("./src/routes/contributions"));
app.use("/api/messages",      require("./src/routes/messages"));

/* ── Health ── */
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

/* ── MongoDB connect & listen ── */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌  MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = app;
