const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Book = require('./Book');

const Chapter = sequelize.define('chapter', {
  name:{
    type: DataTypes.STRING
  },
  text:{
    type: DataTypes.TEXT
  },
  image:{
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true
});

Book.hasMany(Chapter, { onDelete: 'CASCADE', hooks: true });
Chapter.belongsTo(Book);

module.exports = Chapter;
