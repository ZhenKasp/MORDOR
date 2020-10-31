const Book = require('../../../models/Book');
const authenticateToken = require('../../../midlware/authenticateToken');

const myBooks = (app) => {
  app.get('/api/v1/myBooks/', authenticateToken, (req,res) => {
    try {
      Book.findAll({where: {user_id: req.body.user_id}}).then((books => {
        res.json({
          books: books
        });
      }));
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = myBooks;
