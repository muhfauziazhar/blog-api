const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    res.sendStatus(401).end();
  } else {
    const decoded = jwt.verify(token, "authConfig.auth.secret");
    if (decoded) {
      req.user = decoded.id;
      next();
    } else {
      res.sendStatus(401).end();
    }
    try {
    } catch (error) {
      res.sendStatus(401).end();
    }
  }
};
