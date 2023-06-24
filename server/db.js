const Pool = require("pg").Pool;
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });
// console.log(process.env.USER);

// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.DBPORT,
//   database: "todoapp",
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw new Error();
  console.log("Connect to PostgreSQL successfully");
});

module.exports = pool;
