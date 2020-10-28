const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Book = require('./Book');

const Comment = sequelize.define('comment', {
  comment_text:{
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true
});

Comment.belongsTo(User);
Comment.belongsTo(Book);
Book.hasMany(Comment);
User.hasMany(Comment);

module.exports = Comment;
