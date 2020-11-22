const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token == null) return res.json({ error: "You need to signin first.", variant: "danger"}).sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(error.message);
      return res.json({
        token: "",
        error: error.message,
        variant: "danger"
      }).sendStatus(403);
    } else {
      User.findOne({ where: { id: user.id } }).then(dbUser => {
        if (dbUser) {
          if (dbUser.dataValues.is_blocked == false) {
            req.body.is_admin = dbUser.dataValues.is_admin;
            req.body.user_id = user.id;
            req.body.email = user.email;
            req.body.username = user.username;
            req.body.token = token;
          } else {
            return res.json({
              token: null,
              error: "You are bloked",
              variant: "danger"
            }).sendStatus(403);
          }
          next();
        } else {
          return res.json({
            token: null,
            error: "You are terminated",
            variant: "danger"
          }).sendStatus(403);
        }
      });
    }
  });
}

module.exports = authenticateToken;
