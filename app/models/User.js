const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const isUnique = require('../utilities/isUnique');

const User = sequelize.define('user', {
  firstname:{ type: DataTypes.STRING },
  lastname:{ type: DataTypes.STRING },
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
  is_admin:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_verified:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  password:{ type: DataTypes.STRING }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

module.exports = User;
