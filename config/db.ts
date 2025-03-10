import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Root@123',
  database: 'Demo',
  port: 3306, // Ensure this matches your MySQL port
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  multipleStatements: true,
  ssl: { rejectUnauthorized: true }, // Required for some MySQL 8 setups
});

export default pool;
