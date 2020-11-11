const Rating = require('../models/Rating');
const sequelize = require('../models/sequelize');

const returnAverageRatingJson = (book_id, message, res) => {
  Rating.findAll({
    attributes: [
      [sequelize.fn('AVG', sequelize.col('value')), 'averageRating'],
    ],
    where: { book_id },
    raw: true
  }).then(result => {
    return (
      res.json({
        message: message,
        variant: "success",
        averageRating: result[0].averageRating
      })
    )
  })
}

module.exports = returnAverageRatingJson;
