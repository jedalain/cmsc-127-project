import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Note: Corrected from process.env.PASSWORD to process.env.DB_PASSWORD
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});