const Book = require('../../../models/Book')

const tags = (app) => {
  app.get('/api/v1/tags', (req,res) => {
    try {
      Book.findAll({attributes: ['tags']}).then((books => {
        let splittedTags = books.map(book => book.dataValues.tags.split(";"));
        let uniqueTags = Array.from(new Set([].concat(...splittedTags)));

        res.json({
          suggestions: uniqueTags
        });
      }))
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = tags;
