const authenticateToken = require('../../../midlware/authenticateToken');
const Like = require('../../../models/Like');
const returnLikesJson = require('../../../utilities/returnLikesJson');

const likes = (app) => {
  app.get('/api/v1/likes/', (req,res) => {
    try {
      returnLikesJson(req.query.id, "", res);
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/v1/like', authenticateToken, (req,res) => {
    const { user_id, chapter_id } = req.body;
    (async () => {
      try {
        Like.findOne({ where: { user_id, chapter_id }}).then(like => {
          (async () => {
            if (like) {
              await Like.destroy({ where: { id: like.id }});
              returnLikesJson(chapter_id, "Like removed", res)
            } else {
              const newLike = await Like.create();

              await newLike.setUser(user_id);
              await newLike.setChapter(chapter_id);
              returnLikesJson(chapter_id, "Like setted", res);
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

module.exports = likes;
