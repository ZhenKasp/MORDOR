const Chapter = require('../../../models/Chapter');
const Image = require('../../../models/Image');
const authenticateToken = require('../../../midlware/authenticateToken');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const { uploadToS3, getSignedUrl, getSignedChaptersUrls } = require('../../../utilities/s3Functions');

const chapters = (app) => {
  app.get('/api/v1/chapters/', (req,res) => {
    try {
      Chapter.findAll({
        where: { book_id: req.query.id },
        include: [{ model: Image, as: Image }]
      }).then(chapters => {
        (async () => {
          const urls = await getSignedChaptersUrls(chapters.filter(chapter => !!chapter.image).map(
            chapter => ({ key: chapter.image.key, chapter_id: chapter.id })
          ))

          const fullChapters = chapters.map(chapter => {
            return {
              ...chapter.dataValues,
              image: urls.filter(c => c.chapter_id === chapter.id)[0]?.url || ''
            }
          })
          res.json({
            chapters: fullChapters
          });
        })();
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/v1/chapter/', upload.single('image'), authenticateToken, (req,res) => {
    const chapter = { name: req.body.name };
    (async () => {
      try {
        const newChapter = await Chapter.create(chapter);
        if (req.file) {
          const key = `images/${uuidv4()}`;
          let image = {};

          [,image] = await Promise.all([
            uploadToS3(key, req.file.buffer, req.file.mimetype),
            Image.create({ file_name: req.file.originalname, key: key })
          ]);
          await newChapter.setImage(image.id);
        }
        newChapter.setBook(req.body.bookId).then(() => {
          res.json({
            message: "Create chapter successful",
            variant: "success",
            chapter: newChapter
          });
        });
      } catch (error) {
        console.log(error);
        res.json({
          error: error.errors[0].message,
          variant: "danger"
        }).status(400);
      }
    })();
  });

  app.patch('/api/v1/chapter/', upload.single('image'), authenticateToken, (req,res) => {
    const fields = {
      name: req.body.name,
      text: req.body.text,
    };

    (async () => {
      try {
        Chapter.findOne({
          where: { id: req.body.id },
          include: [{ model: Image, as: Image }]
        }).then(chapter => {
          if (chapter) {
            const key = chapter.image ? chapter.image.key : `images/${uuidv4()}`;

            chapter.update(fields).then(() => {
              (async () => {
                if (req.file) {
                  let image = {};

                  if (chapter.image) {
                    Image.destroy({ where: { id: chapter.image.id }});
                  }

                  [,image] = await Promise.all([
                    uploadToS3(key, req.file.buffer, req.file.mimetype),
                    Image.create({ file_name: req.file.originalname, key: key })
                  ]);

                  await chapter.setImage(image.id);
                }
                const imageUrl = await getSignedUrl(key);

                res.json({
                  message: "Create chapter successful",
                  variant: "success",
                  chapter: {...chapter.dataValues, image: imageUrl},
                });
              })();
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
