const generateAccessToken = require('../../../midlware/generateAccessToken');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

signin = (app) => {
  app.post('/api/v1/signin', (req, res) => {
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
              if (data) {
                res.json({ 
                  token: generateAccessToken(email, user.username, user.id), 
                  message: "Login successful." , 
                  variant: "success" 
                });  
              } else {
                return res.json({ 
                  error: "Invalid password.", 
                  variant: "danger" 
                }).status(401);
              };
            });
          });
      } catch (error) {
        res.json({  
          error: error.errors[0].message, 
          variant: "danger"
        }) 
      };  
    })();
  }); 
};

module.exports = signin;
