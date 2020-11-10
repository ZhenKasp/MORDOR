const Book = require('../../../models/Book');
const authenticateToken = require('../../../midlware/authenticateToken');
const Chapter = require('../../../models/Chapter');
const User = require('../../../models/User');

const books = (app) => {
  app.get('/api/v1/books/', (req,res) => {
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

  app.get('/api/v1/book/', (req,res) => {
    try {
      Book.findOne({ where: { id: req.query.id },
        include: [{ model: Chapter, as: Chapter }, { model: User, as: User }]
      }).then(book => {
        res.json({
          book: book,
          isOwner: book.userId == req.query.userId
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/v1/book', authenticateToken, (req,res) => {
    const book = {
      name: req.body.name,
      short_description: req.body.short_description,
      genre: req.body.genre,
      tags: req.body.tags
    };

    (async () => {
      try {
        const newBook = await Book.create(book);
        await newBook.save();
        User.findOne({where: { id: req.body.user_id }}).then(user => {
          newBook.setUser(user).then(() => {
            res.json({
              message: "Create book successful",
              variant: "success",
              book: newBook
            });
          });
        });
      } catch (error) {
        res.json({
          error: error.errors[0].message,
          variant: "danger"
        }).status(400);
      }
    })();
  });

  app.patch('/api/v1/book', authenticateToken, (req,res) => {
    const fields = {
      name: req.body.name,
      short_description: req.body.short_description,
      genre: req.body.genre,
      tags: req.body.tags
    };

    (async () => {
      try {
        Book.findOne({where: { id: req.body.id }}).then(book => {
          if (book) {
            book.update(fields).then(() => {
              res.json({
                message: "Update book successful",
                variant: "success",
                book: book
              });
            });
          }
        });
      } catch (error) {
        res.json({
          error: error.errors[0].message,
          variant: "danger"
        }).status(400);
      }
    })();
  });

  app.delete('/api/v1/book', authenticateToken, (req,res) => {
    (async () => {
      try {
        Book.destroy({where: {id: req.body.id}}).then(book => {
          res.json({
            message: "Delete book successful",
            variant: "success",
            book: book
          });
        });
      } catch (error) {
        res.json({
          error: error.errors[0].message,
          variant: "danger"
        }).status(400);
      }
    })();
  });
}

module.exports = books;
