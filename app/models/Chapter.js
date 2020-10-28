const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Book = require('./Book');

const Chapter = sequelize.define('chapter', {
  chapter_name:{
    type: DataTypes.STRING
  },
  chapter_text:{
    type: DataTypes.STRING
  },
  chapter_image:{
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true
});

Chapter.belongsTo(Book);
Book.hasMany(Chapter);

module.exports = Chapter;
