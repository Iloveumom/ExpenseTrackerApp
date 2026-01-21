const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authenticate = async (req, res, next) => {
  try {
   
    // Token directly header me aa raha hai
    const token = req.header("Authorization");
     console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing"
      });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // User fetch
    const user = await User.findByPk(decoded.SignupId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
module.exports = { authenticate };
