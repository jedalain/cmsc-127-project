//npm i mariadb

import mariadb from 'mariadb';

export const pool = mariadb.createPool({
  host: 'localhost',
  user: 'adminProject',
  password: '127project',
  database: '127project',
  connectionLimit: 10
});


export const query = async (sql: string, values?: any[]) => {
  let conn;

  try{
    conn = await pool.getConnection();
    const res = await conn.query(sql, values);
    return res;
  } finally {
    if (conn) conn.release()
  }
}