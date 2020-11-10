const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Book = require('./Book');

const Rating = sequelize.define('rating', {
  value:{
    type: DataTypes.INTEGER,
  }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  underscored: true
});

User.hasMany(Rating, { onDelete: 'CASCADE', hooks: true });
Book.hasMany(Rating), { onDelete: 'CASCADE', hooks: true };
Rating.belongsTo(User);
Rating.belongsTo(Book);

module.exports = Rating;
