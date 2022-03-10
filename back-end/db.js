const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Thinhbl123!",
  port: 5432,
  database: "finalproject"
});

module.exports = pool;



