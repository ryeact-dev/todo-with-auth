const Pool = require("pg").Pool;
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw new Error();
  console.log("Connect to PostgreSQL successfully");
});

module.exports = pool;
