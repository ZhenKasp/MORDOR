const routes = (app) => {
  require('../controllers/api/v1/users')(app);
  require('../controllers/api/v1/tags')(app);
  require('../controllers/api/v1/books')(app);
  require('../controllers/api/v1/chapters')(app);
  require('../controllers/api/v1/ratings')(app);
  require('../controllers/api/v1/likes')(app);
  require('../controllers/api/v1/comments')(app);
}

module.exports = routes;
