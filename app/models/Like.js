const sequelize = require('./sequelize');
const User = require('./User');
const Chapter = require('./Chapter');

const Like = sequelize.define('like', {}, {underscored: true});

User.hasMany(Like, { onDelete: 'CASCADE', hooks: true }, { onDelete: 'CASCADE', hooks: true });
Chapter.hasMany(Like, { onDelete: 'CASCADE', hooks: true });
Like.belongsTo(User);
Like.belongsTo(Chapter);

module.exports = Like;
