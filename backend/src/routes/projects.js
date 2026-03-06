const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { verifyToken, adminOnly, superAdminOnly } = require("../middleware/auth");

/* GET /api/projects — public */
router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* GET /api/projects/:id — public */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* POST /api/projects — admin */
router.post("/", verifyToken, adminOnly, async (req, res) => {
  try {
    const { title, description, category, status, media } = req.body;
    if (!title || !description || !category)
      return res.status(400).json({ message: "title, description & category are required" });

    const project = await Project.create({
      title, description, category,
      status: status || "ongoing",
      media: media || [],
      createdBy: req.user._id,
    });
    res.status(201).json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* PUT /api/projects/:id — admin (sub-admin can only edit their own) */
router.put("/:id", verifyToken, adminOnly, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Sub-admins can only edit their own projects
    if (req.user.role === "sub-admin" && project.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own projects" });
    }

    const { title, description, category, status, media } = req.body;
    const allowed = {};
    if (title !== undefined) allowed.title = title;
    if (description !== undefined) allowed.description = description;
    if (category !== undefined) allowed.category = category;
    if (status !== undefined) allowed.status = status;
    if (media !== undefined) allowed.media = media;

    const updated = await Project.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

/* DELETE /api/projects/:id — super-admin only */
router.delete("/:id", verifyToken, superAdminOnly, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
