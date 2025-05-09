const jwt = require("jsonwebtoken");
require("dotenv").config();

const secreatKey = process.env.secreatKey

if (!secretKey) {
    throw new Error("Missing 'secreatKey' in environment variables.");
  }

const auth = (req, res, next) => {
  const token = req.headers?.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], secreatKey);

      if (decoded) {
        req.body.authorid = decoded.authorid;

        next();
      } else {
        res.send({ msg: "please login" });
      }
    } catch (err) {
      res.send({ err: err.message });
    }
  } else {
    res.send({ msg: "please login" });
  }
};

module.exports = {
  auth,
};