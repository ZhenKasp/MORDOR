const jwt = require("jsonwebtoken");
require('dotenv').config();

const verify = (req, res, next) => {
  const token = req.query.token;
  if (token == null) return res.json({ error: "Verify error", variant: "danger"}).sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.json({
        token: "",
        error: error.message,
        variant: "danger"
      }).sendStatus(403);
    }

    req.body.user_id = user.id;
    req.body.email = user.email;
    req.body.username = user.username;
    req.body.token = token;
    next();
  });
}

module.exports = verify;
