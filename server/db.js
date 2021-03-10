const Pool = require('pg').Pool;

const pool = new Pool({
  user: "josh",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "social_clone"
});

module.exports = pool;