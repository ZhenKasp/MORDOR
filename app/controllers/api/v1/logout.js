const authenticateToken = require('../../../midlware/authenticateToken');
const logout = (app) => {
  app.delete('/api/v1/logout', authenticateToken, (req, res) => {
    res.json({ view: 'login', message: "Logout successful." , variant: "success"});
  });
}

module.exports = logout;
