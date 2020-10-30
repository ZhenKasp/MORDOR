const Book = require('../../../models/Book')
const authenticateToken = require('../../../midlware/authenticateToken');

const tags = (app) => {
  app.get('/api/v1/tags', authenticateToken, (req,res) => {
    Book.aggregate('tags', 'DISTINCT', { plain: false }).then((books => {
      console.log(books);
      // let splittedTags = books.map(game => game.dataValues.tags.split("|"));
      // let uniqueTags = Array.from(new Set([].concat(...splittedTags)));

      res.json({
        suggestions: books
      });
    }))
  });
}

module.exports = tags;
