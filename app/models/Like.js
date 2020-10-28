const sequelize = require('./sequelize');
const User = require('./User');
const Chapter = require('./Chapter');

const Like = sequelize.define('like', {}, {underscored: true});

Like.belongsTo(User);
Like.belongsTo(Chapter);
User.hasMany(Like);
Chapter.hasMany(Like);

module.exports = Like;
