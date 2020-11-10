const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Book = sequelize.define('book', {
  name:{
    type: DataTypes.STRING
  },
  short_description:{
    type: DataTypes.STRING
  },
  genre:{
    type: DataTypes.STRING
  },
  tags:{
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true
});

User.hasMany(Book, { onDelete: 'CASCADE', hooks: true });
Book.belongsTo(User);

module.exports = Book;
