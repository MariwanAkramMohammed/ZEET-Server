const jwt = require("jsonwebtoken");

const verifyUsers = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRETKEY, (error, data) => {
      if (error) {
        res
          .status(400)
          .json({ error: "your token is not available to access" });
      } else if (data) {
        next();
      }
    });
  } else {
    res.status(400).json({ error: "you have to register first" });
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRETKEY, (error, data) => {
      if (error) {
        res.status(400).json({ error: "you are not allowed sorry" });
      } else if (data.isAdmin) {
        next();
      } else {
        res.status(400).json({ error: "you are not Admin, sorry" });
      }
    });
  } else {
    res.status(400).json({ error: "you have to register first" });
  }
};

module.exports = { verifyUsers, verifyAdmin };
