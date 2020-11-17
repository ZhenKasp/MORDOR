const Chapter = require('../../../models/Chapter');
const Book = require('../../../models/Book');
const authenticateToken = require('../../../midlware/authenticateToken');

const chapters = (app) => {
  app.post('/api/v1/chapter/', authenticateToken, (req,res) => {
    const chapter = { name: req.body.name };
    (async () => {
      try {
        const newChapter = await Chapter.create(chapter);
        await newChapter.save();
        Book.findOne({where: { id: req.body.bookId }}).then(book => {
          newChapter.setBook(book).then(() => {
            res.json({
              message: "Create chapter successful",
              variant: "success",
              chapter: newChapter
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

  app.patch('/api/v1/chapter/', authenticateToken, (req,res) => {
    const fields = {
      name: req.body.name,
      text: req.body.text,
    };

    (async () => {
      try {
        Chapter.findOne({where: { id: req.body.id }}).then(chapter => {
          if (chapter) {
            chapter.update(fields).then(() => {
              res.json({
                message: "Update chapter successful",
                variant: "success",
                chapter: chapter
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

  app.delete('/api/v1/chapter/', authenticateToken, (req,res) => {
    (async () => {
      try {
        Chapter.destroy({where: {id: req.body.id}}).then(() => {
          res.json({
            message: "Delete chapter successful",
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
}

module.exports = chapters;
