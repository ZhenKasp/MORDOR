const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Book = sequelize.define('book', {
  name:{ type: DataTypes.STRING },
  short_description:{ type: DataTypes.TEXT },
  genre:{ type: DataTypes.STRING },
  tags:{ type: DataTypes.STRING },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true,
  indexes: [
    { type: 'FULLTEXT', name: 'book_idx', fields: ['name', 'short_description'] }
  ]
});

User.hasMany(Book, { onDelete: 'CASCADE', hooks: true });
Book.belongsTo(User);

module.exports = Book;
