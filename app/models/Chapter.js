const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Book = require('./Book');

const Chapter = sequelize.define('chapter', {
  name:{
    type: DataTypes.STRING
  },
  text:{
    type: DataTypes.STRING
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

Chapter.belongsTo(Book);
Book.hasMany(Chapter);

module.exports = Chapter;
