const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Book = require('./Book');

const Chapter = sequelize.define('chapter', {
  name: { type: DataTypes.STRING },
  text: { type: DataTypes.TEXT }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true,
  indexes: [
    { type: 'FULLTEXT', name: 'chapter_idx', fields: ['name', 'text'] }
  ]
});

Book.hasMany(Chapter, { onDelete: 'CASCADE', hooks: true });
Chapter.belongsTo(Book);

module.exports = Chapter;
