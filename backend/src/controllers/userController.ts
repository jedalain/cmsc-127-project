import { Request, Response } from 'express';
import { query } from '../config/dbConfig';

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fname, mname, lname, role } = req.body;
    const sql = 'INSERT INTO users (email, password, fname, mname, lname, role) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await query(sql, [email, password, fname, mname, lname, role]);
    res.status(201).json({ id: result.insertId, email, fname, mname, lname, role });
  } catch (error) {
    console.log(error);
  }
}