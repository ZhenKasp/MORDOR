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
    await sequelize.query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await sequelize.sync();
  console.log("All models were synchronized successfully.");
})();

module.exports = sequelize;
