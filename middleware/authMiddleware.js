require("dotenv").config(); // Ensure this is at the top

const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // 🧪 DEBUG THIS LINE
    console.log("Decoded token:", decoded);

    if (!decoded.id || !decoded.role) {
      return res.status(400).json({ message: "Invalid token payload." });
    }

    req.user = {
      userId: decoded.id, 
      role: decoded.role,
    };

    next();
  });
};
