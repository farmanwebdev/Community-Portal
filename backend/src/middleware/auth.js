const jwt = require("jsonwebtoken");
// env is already loaded by app.js (dotenv.config()) before routes are required

/* Verify the JWT and attach the decoded payload to req.user */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No or malformed token provided" });

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

/* Only super-admin may proceed */
const superAdminOnly = (req, res, next) =>
  req.user.role === "super-admin"
    ? next()
    : res.status(403).json({ message: "Super-admin access required" });

/* super-admin OR sub-admin */
const adminOnly = (req, res, next) =>
  ["super-admin", "sub-admin"].includes(req.user.role)
    ? next()
    : res.status(403).json({ message: "Admin access required" });

module.exports = { verifyToken, superAdminOnly, adminOnly };
