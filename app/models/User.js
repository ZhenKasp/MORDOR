const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const isUnique = require('../utilities/isUnique');

const User = sequelize.define('user', {
  firstname:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  lastname:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  email:{
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Invalid Email.'
      },
      isUnique: isUnique("User", "email")
    }
  },
  username:{
    type: DataTypes.STRING,
    isAlphanumeric: true,
    validate: {
      isUnique: isUnique("User", "username")
    }
  },
  role:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  password:{
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

module.exports = User;
