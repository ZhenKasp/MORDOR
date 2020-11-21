const Book = require('../../../models/Book');
const authenticateToken = require('../../../midlware/authenticateToken');
const Chapter = require('../../../models/Chapter');
const User = require('../../../models/User');
const Image = require('../../../models/Image');
const Rating = require('../../../models/Rating');
const sequelize = require('../../../models/sequelize');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const { uploadToS3, getSignedUrl, getSignedUrls } = require('../../../utilities/s3Functions');

const books = (app) => {
  app.get('/api/v1/books/', (req,res) => {
    try {
      Book.findAll({ include: [{ model: Image, as: Image }]}).then(books => {
        Book.findAll({
          attributes: [
            "id", [sequelize.fn('AVG', sequelize.col('ratings.value')), 'rating'],
          ],
          include: [{ model: Rating, as: Rating, attributes: [] }],
          group: ["ratings.book_id"],
          raw: true
        }).then(ratedBooks => {
          (async () => {
            const urls = await getSignedUrls(books.filter(book => !!book.image).map(
              book => ({ key: book.image.key, book_id: book.id })
            ))

            const fullBooks = books.map(book => {
              return {
                ...book.dataValues,
                rating: ratedBooks.filter(b => b.id === book.id)[0]?.rating || 0,
                image: urls.filter(b => b.book_id === book.id)[0]?.url
              }
            })
            res.json({
              books: fullBooks
            });
          })();
        })
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/api/v1/book/', (req,res) => {
    try {
      Book.findOne({
        where: { id: req.query.id },
        include: [
          { model: Chapter, as: Chapter },
          { model: User, as: User },
        ]
      }).then(book => {
        res.json({
          book: book,
          isOwner: book?.userId == req.query.userId
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/v1/book', upload.single('image'), authenticateToken, (req,res) => {
    const { name, short_description, genre, tags, user_id } = req.body;
    const key = `images/${uuidv4()}`;
    let imageUrl = "";
    let image = {};

    (async () => {
      try {
        const newBook = await Book.create({
          name, short_description, genre, tags
        });

        if (req.file) {
          [,image,imageUrl] = await Promise.all([
            uploadToS3(key, req.file.buffer, req.file.mimetype),
            Image.create({ file_name: req.file.originalname, key: key }),
            getSignedUrl(key)
          ])
        }

        await newBook.setImage(image.id),
        newBook.setUser(user_id).then(() => {
          res.json({
            message: "Create book successful",
            variant: "success",
            book: {...newBook.dataValues, image: imageUrl},
          });
        });
      } catch (error) {
        console.log(error.message);
        res.json({
          error: error.original?.sqlMessage || error.errors[0].message,
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

  app.delete('/api/v1/book/', authenticateToken, (req,res) => {
    (async () => {
      try {
        Book.destroy({where: {id: req.body.id}}).then(() => {
          res.json({
            message: "Delete book successful",
            variant: "success",
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

  app.get('/api/v1/books/bestBooks/', (req,res) => {
    try {
      Book.findAll({
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('ratings.value')), 'rating'],
          ]
        },
        order: [[sequelize.fn('AVG', sequelize.col('ratings.value')), 'DESC']],
        include: [{ model: Rating, as: Rating, attributes: [], right: true }],
        group: ["ratings.book_id"],
      }).then(ratedBooks => {
        res.json({ books: ratedBooks.slice(0, 5) });
      })
    } catch (error) {
      res.json({
        error: error.errors[0].message,
        variant: "danger"
      }).status(400);
    }
  });

  app.get('/api/v1/books/lastUpdatedBooks/', (req,res) => {
    try {
      Book.findAll({
        include: [
          { model: Chapter, as: Chapter, attributes: ['updatedAt'] },
          { model: Rating, as: Rating, attributes: ['value']},
        ],
        order: [
          [Chapter, 'updatedAt', 'DESC']
        ]
      }).then(lastUpdatedBooks => {
          res.json({
            books: lastUpdatedBooks.slice(0, 5),
          });
        })
    } catch (error) {
      res.json({
        error: error.errors[0].message,
        variant: "danger"
      }).status(400);
    }
  });
}

module.exports = books;
