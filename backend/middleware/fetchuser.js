const jwt = require("jsonwebtoken");
const JWT_SECRET = "Amit@100";

const fetchuser = (req, res, next) => {
  // Get user from JWT token and add id to req token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Invalid token " });
  }
  try {
    const deta = jwt.verify(token, JWT_SECRET);
    req.user = deta.user;
    next();
  } catch {
    res.status(401).send({ error: "Invalid token " });
  }
};
module.exports = fetchuser;
