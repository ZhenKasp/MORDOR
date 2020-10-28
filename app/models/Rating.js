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

Rating.belongsTo(User);
Rating.belongsTo(Book);
User.hasMany(Rating);
Book.hasMany(Rating);

module.exports = Rating;
