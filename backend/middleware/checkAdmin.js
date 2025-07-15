function checkAdmin(req, res, next) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  const sentPassword = req.headers["admin-password"];

  if (ADMIN_PASSWORD !== sentPassword) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
}

module.exports = checkAdmin;
