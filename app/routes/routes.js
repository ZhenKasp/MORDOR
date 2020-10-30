const routes = (app) => {
  require('../controllers/api/v1/signin')(app);
  require('../controllers/api/v1/signup')(app);
  require('../controllers/api/v1/logout')(app);
  require('../controllers/api/v1/tags')(app);
  require('../controllers/api/v1/books')(app);
  require('../controllers/api/v1/chapters')(app);
}

module.exports = routes;
