const { Pool } = require("pg");
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD } = process.env;

module.exports = new Pool({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: 5432
});
