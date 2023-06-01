import mysql from "mysql";

const db = mysql.createConnection({
  host: process.env.NEXT_PUBLIC_MYSQL_HOST,
  database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
  port: +process.env.NEXT_PUBLIC_MYSQL_PORT,
  user: process.env.NEXT_PUBLIC_MYSQL_USER,
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
});

export default db;
