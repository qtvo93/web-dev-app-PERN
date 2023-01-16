const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: process.env.DBpassword,
  port: 5432,
  database: "finalproject"
});

module.exports = pool;



