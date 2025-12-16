const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Extract token (Bearer <token>)
    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenParts[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user info to request
    req.user = decoded;

    next(); // ✅ continue to the next middleware or route
  } catch (err) {
    console.error("JWT error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
