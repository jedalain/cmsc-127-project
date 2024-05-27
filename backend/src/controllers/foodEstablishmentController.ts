import { Request, Response } from 'express';
import { query } from '../config/dbConfig';

export const addFoodEstablishment = async (req: Request, res: Response) => {
  try {
    const { name, address, avgRating, userId } = req.body;
    const sql = 'INSERT INTO foodEstablishments (name, address, avgRating, userId) VALUES (?, ?, ?, ?)';
    const result = await query(sql, [name, address, avgRating, userId]);
    res.status(201).json({ id: result.insertId, name, address, avgRating, userId });
  } catch (error) {
    console.log(error);
  }
};

export const updateFoodEstablishment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address, avgRating } = req.body;
    const sql = 'UPDATE foodEstablishments SET name = ?, address = ?, avgRating = ? WHERE establishmentId = ?';
    await query(sql, [name, address, avgRating, id]);
    res.status(200).json({ id, name, address, avgRating });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFoodEstablishment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM foodEstablishments WHERE establishmentId = ?';
    await query(sql, [id]);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

export const getFoodEstablishment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM foodEstablishments WHERE establishmentId = ?';
    const result = await query(sql, [id]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: 'Food Establishment not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllFoodEstablishments = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM foodEstablishments';
    const result = await query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
