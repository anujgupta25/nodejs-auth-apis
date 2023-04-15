const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  let err = [];
  if (!token) {
    err.push({ msg: "Invalid request" });
    return res.status(403).json(err);
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {
    if (err) return res.status(403).json(err);
  });

  next();
};
