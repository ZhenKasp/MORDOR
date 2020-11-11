const Book = require('../../../models/Book');
const authenticateToken = require('../../../midlware/authenticateToken');
const Rating = require('../../../models/Rating');
const sequelize = require('../../../models/sequelize');

const myBooks = (app) => {
  app.get('/api/v1/myBooks/', authenticateToken, (req,res) => {
    try {
      Book.findAll({where: {user_id: req.body.user_id}}).then((books => {
        Book.findAll({
          where: { user_id: req.body.user_id },
          attributes: {
            include: [
              [sequelize.fn('AVG', sequelize.col('ratings.value')), 'rating'],
            ]
          },
          include: [{ model: Rating, as: Rating, attributes: [] }],
          raw: true
        }).then(ratedBooks => {
          res.json({
            books: books,
            ratings: ratedBooks.map(rated => ({id: rated.id, rating: rated.rating}))
          });
        })
      }));
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = myBooks;
