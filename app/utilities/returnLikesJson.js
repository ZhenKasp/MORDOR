const Like = require('../models/Like');

const returnLikesJson = (chapter_id, message, res) => {
  Like.findAll({
    where: { chapter_id },
  }).then(likes => {
    return (
      res.json({
        message: message,
        variant: "success",
        likes: likes
      })
    )
  })
}

module.exports = returnLikesJson;
