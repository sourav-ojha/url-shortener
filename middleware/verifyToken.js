// middleware to verify token
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const AuthToken = req.headers["authorization"];
  if (!AuthToken) {
    return res.status(401).json({
      status: false,
      message: "No token provided",
    });
  }
  try {
    let token = AuthToken.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: err.message,
    });
  }
};
module.exports = verifyToken;
