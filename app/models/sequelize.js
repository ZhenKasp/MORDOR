const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.LOGIN, process.env.PASSWORD, { 
  host: process.env.HOST,
  dialect: 'mysql',
  logging: console.log
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await sequelize.sync();
  console.log("All models were synchronized successfully.");
})();

module.exports = sequelize;