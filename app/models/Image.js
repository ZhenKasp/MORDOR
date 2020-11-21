const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Book = require('./Book');
const Chapter = require('./Chapter');

const Image = sequelize.define('image', {
  key: { type: DataTypes.STRING },
  file_name:{ type: DataTypes.STRING },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true
});

Book.hasOne(Image, { onDelete: 'CASCADE', hooks: true });
Image.belongsTo(Book);
Chapter.hasOne(Image, { onDelete: 'CASCADE', hooks: true });
Image.belongsTo(Chapter);

module.exports = Image;
