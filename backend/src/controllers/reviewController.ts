import { Request, Response } from 'express';
import { query } from '../config/dbConfig';

export const addReview = async (req: Request, res: Response) => {
  try {
    const { status, rating, title, comment, dateCreated, dateModified, userId, establishmentId, foodId } = req.body;
    const sql = 'INSERT INTO reviews (status, rating, title, comment, dateCreated, dateModified, userId, establishmentId, foodId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await query(sql, [status, rating, title, comment, dateCreated, dateModified, userId, establishmentId, foodId]);
    res.status(201).json({ id: result.insertId, status, rating, title, comment, dateCreated, dateModified, userId, establishmentId, foodId });
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, rating, title, comment, dateModified } = req.body;
    const sql = 'UPDATE reviews SET status = ?, rating = ?, title = ?, comment = ?, dateModified = ? WHERE reviewId = ?';
    await query(sql, [status, rating, title, comment, dateModified, id]);
    res.status(200).json({ id, status, rating, title, comment, dateModified });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM reviews WHERE reviewId = ?';
    await query(sql, [id]);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

export const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM reviews WHERE reviewId = ?';
    const result = await query(sql, [id]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM reviews';
    const result = await query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
