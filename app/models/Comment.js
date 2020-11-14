const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Book = require('./Book');

const Comment = sequelize.define('comment', {
  text:{
    type: DataTypes.TEXT
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true
});

Book.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
User.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
Comment.belongsTo(User);
Comment.belongsTo(Book);

module.exports = Comment;
