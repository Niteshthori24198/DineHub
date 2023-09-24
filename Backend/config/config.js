
require('dotenv').config()
const mysql2 = require('mysql2');
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB,
    "host": process.env.host,
    "dialect": "mysql",
    "dialectModule": mysql2,
    "port": 6228
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB,
    "host": process.env.host,
    "dialect": "mysql",
    "dialectModule": mysql2,
    "port": 6228
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB,
    "host": process.env.host,
    "dialect": "mysql",
    "dialectModule": mysql2,
    "port": 6228
  }
}
