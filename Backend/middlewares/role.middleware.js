module.exports = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.role;

  if (Array.isArray(allowedRoles)) {
    if (!allowedRoles.includes(userRole)) return res.status(403).json({ message: "Forbidden" });
  } else {
    if (userRole !== allowedRoles) return res.status(403).json({ message: "Forbidden" });
  }

  next();
};
