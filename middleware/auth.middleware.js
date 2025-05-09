const jwt = require("jsonwebtoken");
require("dotenv").config();

const secreatKey = process.env.secreatKey

if (!secreatKey) {
    throw new Error("Missing 'secreatKey' in environment variables.");
  }

  const auth = (req, res, next) => {
    const token = req.headers?.authorization;
  
    if (!token) {
      return res.status(401).json({ msg: "No token provided. Please login." });
    }
  
    try {
      const decoded = jwt.verify(token.split(" ")[1], secreatKey);
      
      if (!decoded) {
        return res.status(401).json({ msg: "Invalid token. Please login again." });
      }
      
      // Set user info in req.user
      req.user = {
        _id: decoded.userId
      };
      
      next();
    } catch (err) {
      return res.status(401).json({ error: "Token verification failed", msg: err.message });
    }
  };

module.exports = {
  auth,
};