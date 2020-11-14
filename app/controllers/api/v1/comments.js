const authenticateToken = require('../../../midlware/authenticateToken');
const Comment = require('../../../models/Comment');
const User = require('../../../models/User');

const comments = (app) => {
  app.get('/api/v1/comments/', authenticateToken, (req,res) => {
    try {
      Comment.findAll({
        where: { book_id: req.query.id },
        include: { model: User, as: User },
      }).then(comments => {
        res.json({
          comments: comments
        })
      })
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/v1/comments', authenticateToken, (req,res) => {
    const { text, book_id, user_id } = req.body;
    (async () => {
      try {
        const newComment = await Comment.create({ text: text });
        await newComment.save();

        newComment.setUser(user_id);
        newComment.setBook(book_id);
        res.json({
          comment: newComment,
          variant: "success",
          message: "Comment added"
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

module.exports = comments;
