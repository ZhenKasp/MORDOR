const Chapter = require('../../../models/Chapter')
const authenticateToken = require('../../../midlware/authenticateToken');

const chapters = (app) => {
  app.get('/api/v1/chapters/', authenticateToken, (req,res) => {
    try {
      Chapter.findAll({ where: { book_id: req.body.id }}).then((chapters => {
        res.json({
          chapters: chapters
        });
      }));
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/api/v1/chapter/', authenticateToken, (req,res) => {
    try {
      Chapter.findOne({ where: { id: req.body.id }}).then((chapter => {
        res.json({
          chapter: chapter
        });
      }));
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = chapters;
