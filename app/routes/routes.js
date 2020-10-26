routes = (app, io) => {
  require('../controllers/api/v1/signin')(app);
  require('../controllers/api/v1/signup')(app);
  require('../controllers/api/v1/logout')(app);
}

module.exports = routes;