const express = require('express');
const logger = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const http = require("http");
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./app/models/sequelize');

mysql.createPool({
  connectionLimit : 100,
  host: process.env.HOST,
  user: process.env.LOGIN,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

app.use(cors({
  origin: process.env.CORS,
  credentials : true
 }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => console.log(`Listening on port ${port}`));

require('./app/routes/routes')(app);

module.exports = app;
