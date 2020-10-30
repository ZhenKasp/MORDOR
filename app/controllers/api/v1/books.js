const Book = require('../../../models/Book');
const authenticateToken = require('../../../midlware/authenticateToken');
const Chapter = require('../../../models/Chapter');

const books = (app) => {
  app.get('/api/v1/books/', authenticateToken, (req,res) => {
    try {
      Book.findAll().then((books => {
        res.json({
          books: books
        });
      }));
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/v1/book', authenticateToken, (req,res) => {
    const book = {
      name: req.body.name,
      short_description: req.body.short_description,
      genre: req.body.genre,
      tags: req.body.tags,
      user_id: req.body.id
    };

    (async () => {
      try {
        const newBook = await Book.create(book);
        await newBook.save();

        res.json({
          message: "Create book successful",
          variant: "success",
          book: newBook
        });
      } catch (error) {
        res.json({
          error: error.errors[0].message,
          variant: "danger"
        }).status(400);
      }
    })();
  });

  app.get('/api/v1/book/', authenticateToken, (req,res) => {
    try {
      Book.findOne({ where: { id: req.body.id }, include: [{ model: Chapter, as: Chapter }]}).then((book => {
        res.json({
          book: book
        });
      }));
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = books;
