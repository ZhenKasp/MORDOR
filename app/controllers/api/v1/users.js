const authenticateToken = require('../../../midlware/authenticateToken');
const generateAccessToken = require('../../../midlware/generateAccessToken');
const verify = require('../../../midlware/verify');
const User = require('../../../models/User');
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
        await User.findOne({ where: {email: email} })
          .then(user => {
            if (!user) return res.json({
              error: "User doesn't exist.",
              variant: "danger"
            }).status(400);
            bcrypt.compare(password, user.password, (err, data) => {
              if (err) throw err;
              if (user.is_verified == false) {
                res.json({
                  error: "You need to verify your account first.",
                  variant: "danger"
                });
              }
              if (data) {
                res.json({
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
          email: email,
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: hashPass,
          role: "user",
        });
        await newUser.save();
        const token = generateAccessToken(email, username, newUser.id);

        await createMail(mailer, email, token);

        res.json({
          token: token,
          username: username,
          id: newUser.id,
          message: "Registration successful." ,
          variant: "success"
        });
      } catch (error) {
        console.log(error);
        res.json({ error: error.errors[0].message, variant: "danger"}).status(400);
      }
    })();
  });

  app.delete('/api/v1/users/logout', authenticateToken, (req, res) => {
    res.json({ view: 'login', message: "Logout successful." , variant: "success"});
  });

  app.get('/api/v1/users/verification', verify, (req,res) => {
    try {
      User.findOne({ where: { id: req.body.user_id} }).then(user => {
        if (user) {
          user.update({ is_verified: true }).then(() => {
            res.json({
              message: "Verified user successful",
              variant: "success",
              user: user
            });
          }).catch(err => {
            console.log(err, err.message);
            res.json({
              message: err.original?.sqlMessage || err.message || err.errors[0].message,
              variant: "danger",
            }).status(400);
          });
        }
        res.json({
          user: user
        })
      })
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = users;
