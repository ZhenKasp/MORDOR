const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const isUnique = require('../utilities/isUnique');

const User = sequelize.define('user', {
  username:{
    type: DataTypes.STRING,
    isAlphanumeric: true,
    isUnique: isUnique("User", "username")
  },
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
  password:{
    type: DataTypes.STRING
  }
}, { 
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

module.exports = User;