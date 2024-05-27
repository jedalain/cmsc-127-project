import { Request, Response } from 'express';
import { query } from '../config/dbConfig';

export const addFoodItem = async (req: Request, res: Response) => {
  try {
    const { classification, name, price, avgRating, establishmentId } = req.body;
    const sql = 'INSERT INTO foodItems (classification, name, price, avgRating, establishmentId) VALUES (?, ?, ?, ?, ?)';
    const result = await query(sql, [classification, name, price, avgRating, establishmentId]);
    res.status(201).json({ id: result.insertId, classification, name, price, avgRating, establishmentId });
  } catch (error) {
    console.log(error);
  }
};

export const updateFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { classification, name, price, avgRating } = req.body;
    const sql = 'UPDATE foodItems SET classification = ?, name = ?, price = ?, avgRating = ? WHERE foodId = ?';
    await query(sql, [classification, name, price, avgRating, id]);
    res.status(200).json({ id, classification, name, price, avgRating });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM foodItems WHERE foodId = ?';
    await query(sql, [id]);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

export const getFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM foodItems WHERE foodId = ?';
    const result = await query(sql, [id]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: 'Food Item not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllFoodItems = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM foodItems';
    const result = await query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
