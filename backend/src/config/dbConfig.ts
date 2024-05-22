//npm i mariadb

import mariadb from "mariadb";

export const pool = mariadb.createPool({
  host: "localhost",
  user: "adminProject",
  password: "127project",
  database: "127project",
  connectionLimit: 10,
  trace: true,
});

// Function to test the connection
const testConnection = async () => {
  let conn;

  try {
    conn = await pool.getConnection();

    await conn.query("SELECT 1");
    console.log("Connected to MariaDB successfully!");
  } catch (err) {
    console.error("Error connecting to MariaDB:", err);
  } finally {
    if (conn) conn.release();
  }
};

// mariadb is confirmed to be connected
testConnection();

export const query = async (sql: string, values?: any[]) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const res = await conn.query(sql, values);
    return res;
  } finally {
    if (conn) conn.release();
  }
};
