const authenticateToken = require('../../../midlware/authenticateToken');
const generateAccessToken = require('../../../midlware/generateAccessToken');
const verify = require('../../../midlware/verify');
const User = require('../../../models/User');
const Book = require('../../../models/Book');
const bcrypt = require('bcryptjs');
const mailer = require('../../../mailer/mailerConfig');
const createMail = require('../../../mailer/createMail');

const users = (app) => {
  app.get('/api/v1/user/', authenticateToken, (req,res) => {
    try {
      User.findOne({ where: { id: req.query.id } }).then(user => {
        res.json({
          user: user
        })
      })
    } catch (error) {
      console.log(error);
    }
  });

  app.patch('/api/v1/user', authenticateToken, (req,res) => {
    const fields = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      username: req.body.userName
    };

    (async () => {
      try {
        User.findOne({ where: { id: req.body.user_id }}).then(user => {
          if (user) {
            user.update(fields).then(() => {
              res.json({
                message: "Update user successful",
                variant: "success",
                user: user
              });
            }).catch(err => {
              res.json({
                message: err.original?.sqlMessage || err.errors[0].message,
                variant: "danger",
              }).status(400);
            });
          }
        });
      } catch (error) {
        res.json({
          error: error.original?.sqlMessage || error.errors[0].message,
          variant: "danger"
        }).status(400);
      }
    })();
  });

  app.post('/api/v1/users/signin', (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    (async () => {
      try {
        await User.findOne({ where: {email: email}, raw: true })
          .then(user => {
            if (!user) return res.json({
              error: "User doesn't exist.",
              variant: "danger"
            }).status(400);
            bcrypt.compare(password, user.password, (err, data) => {
              if (err) throw err;
              if (!user.is_verified) {
                return res.json({
                  error: "You need to verify your account first.",
                  variant: "warning"
                }).status(401);
              } else if (user.is_blocked) {
                return res.json({
                  error: "You are bloked.",
                  variant: "danger"
                }).status(401);
              } else if (data) {
                return res.json({
                  token: generateAccessToken(email, user.username, user.id),
                  username: user.username,
                  id: user.id,
                  message: "Login successful." ,
                  variant: "success"
                });
              } else {
                return res.json({
                  error: "Invalid password.",
                  variant: "danger"
                }).status(401);
              }
            });
          });
      } catch (error) {
        res.json({
          error: error.original?.sqlMessage || error.errors[0].message,
          variant: "danger"
        })
      }
    })();
  });

  app.post('/api/v1/users/signup', (req,res) => {
    const email = req.body.email.toLowerCase(),
      username = req.body.username,
      firstname = req.body.firstname,
      lastname = req.body.lastname,
      password = req.body.password;
    const hashPass = require('bcryptjs').hashSync(password, 9);

    (async () => {
      try {
        const newUser = await User.create({
          email, username, firstname, lastname, password: hashPass
        })
        await newUser.save();
        const token = generateAccessToken(email, username, newUser.id);
        await createMail(mailer, email, token);
        return res.json({
          email: email,
          message: "Registration successful." ,
          variant: "success"
        });
      } catch (error) {
        console.log(error.message);
        res.json({ error: error.original?.sqlMessage || error.errors[0].message, variant: "danger"}).status(400);
      }
    })();
  });

  app.delete('/api/v1/users/logout', authenticateToken, (req, res) => {
    res.json({ message: "Logout successful." , variant: "success"});
  });

  app.get('/api/v1/users/verification', verify, (req,res) => {
    try {
      User.findOne({ where: { id: req.body.user_id} }).then(user => {
        if (user) {
          user.update({ is_verified: true }).then(() => {
            res.redirect(process.env.CORS + '/signin');
          }).catch(err => {
            res.json({
              message: err.original?.sqlMessage || err.message || err.errors[0].message,
              variant: "danger",
            }).status(400);
          });
        }
      })
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/api/v1/users', authenticateToken, (req, res) => {
    if (req.body.is_admin) {
      User.findAll().then((users => {
        res.json({
          users: users
        });
      }))
    } else {
      res.json({
        error: "Current user is not admin",
        variant: "danger",
      });
    }
  });

  app.get('/api/v1/users/isOwner', (req, res) => {
      Book.findOne({ where: { id: req.query.book_id }, attributes: ["user_id"]}).then((book => {
        (async () => {
          if (book) {
            const user = await User.findOne({ where: { id: req.query.user_id }})
            res.json({
              isOwner: book.dataValues.user_id == req.query.user_id || user.dataValues.is_admin
            });
          } else {
            res.json({
              isOwner: false,
              error: "Not found",
              variant: "danger"
            }).status(404);
          }
        })();
      }))
  });

  app.patch('/api/v1/users/unblock', authenticateToken, (req,res) => {
    (async () => {
      const userIDs = req.body.ids.split(";");
      await User.update({ is_blocked: false }, {where: { id: userIDs }});
      await User.findAll().then(users => {
        res.json({
          users: users,
          message: "Unblock successful.",
          variant: "success"
        });
      });
    })();
  });

  app.patch('/api/v1/users/block', authenticateToken, (req,res) => {
    (async () => {
      const userIDs = req.body.ids.split(";");
      await User.update({ is_blocked: true }, {where: { id: userIDs }});
      await User.findAll().then(users => {
        res.json({
          users: users,
          message: "Block successful.",
          variant: "success"
        });
      })
    })();
  });

  app.patch('/api/v1/users/verify', authenticateToken, (req,res) => {
    (async () => {
      const userIDs = req.body.ids.split(";");
      await User.update({ is_verified: true }, {where: { id: userIDs }})
      await User.findAll().then(users => {
        res.json({
          users: users,
          message: "Verify successful.",
          variant: "success"
        });
      });
    })();
  });

  app.patch('/api/v1/users/makeAdmin', authenticateToken, (req,res) => {
    (async () => {
      const userIDs = req.body.ids.split(";");
      await User.update({ is_admin: true }, {where: { id: userIDs }});
      await User.findAll().then(users => {
        res.json({
          users: users,
          message: "Make Admin successful.",
          variant: "success"
        });
      })
    })();
  });

  app.patch('/api/v1/users/removeAdmin', authenticateToken, (req,res) => {
    (async () => {
      const userIDs = req.body.ids.split(";");
      await User.update({ is_admin: false }, { where: { id: userIDs }});
      await User.findAll().then(users => {
        res.json({
          users: users,
          message: "Remove Admin successful.",
          variant: "success"
        });
      })
    })();
  });

  app.patch('/api/v1/users/remove', authenticateToken, (req,res) => {
    (async () => {
      const userIDs = req.body.ids.split(";");
      await User.destroy({ where: { id: userIDs }});
      await User.findAll().then(users => {
        res.json({
          users: users,
          message: "Remove successful.",
          variant: "success"
        });
      });
    })();
  });
};

module.exports = users;
