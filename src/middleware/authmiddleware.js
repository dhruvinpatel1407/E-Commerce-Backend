const { verifyToken } = require("../config/auth");
const chalk = require("chalk");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(chalk.red.bold("Token verification error: "), err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
