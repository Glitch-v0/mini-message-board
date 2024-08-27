const { Pool } = require("pg");
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD, PORT } = process.env;

module.exports = new Pool({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: PORT
});
