const authenticateToken = require('../../../midlware/authenticateToken');
const Rating = require('../../../models/Rating');
const returnAverageRatingJson = require('../../../utilities/returnAverageRatingJson');

const rating = (app) => {
  app.post('/api/v1/rating', authenticateToken, (req,res) => {
    const { value, user_id, book_id } = req.body;

    (async () => {
      try {
        Rating.findOne({ where: { user_id: user_id, book_id }}).then(rating => {
          (async () => {
            if (rating) {
              await rating.update({ value });
              returnAverageRatingJson(book_id, "Rating set successful", res);
            } else {
              const newRating = await Rating.create({ value, user_id, book_id });
              newRating.setUser(user_id);
              newRating.setBook(book_id);
              returnAverageRatingJson(book_id, "Rating create successful", res);
            }
          })();
        });
      } catch (error) {
        res.json({
          error: error.original?.sqlMessage || error.errors[0].message,
          variant: "danger"
        }).status(400);
      }
    })();
  });
}

module.exports = rating;
