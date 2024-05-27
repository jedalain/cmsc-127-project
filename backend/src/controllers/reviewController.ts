import { Request, Response } from 'express';
import { query } from '../config/dbConfig';
import { checkExistence, convertBigInt } from './helper';


export const addReview = async (req: Request, res: Response) => {
  try {
    const { rating, title, comment, userId, establishmentId, foodId, reviewFor } = req.body;
    const status = 'CREATED'; // status of newly created review

    // Check if userId exists
    if (!await checkExistence('users', 'userId', userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // Check if establishmentId exists if reviewFor includes 'estab'
    if ((reviewFor === 'estab' || reviewFor === 'estabFood') && !await checkExistence('foodEstablishments', 'establishmentId', establishmentId)) {
      return res.status(400).json({ error: 'Invalid establishmentId' });
    }

    // Check if foodId exists if reviewFor includes 'food'
    if ((reviewFor === 'food' || reviewFor === 'estabFood') && !await checkExistence('foodItems', 'foodId', foodId)) {
      return res.status(400).json({ error: 'Invalid foodId' });
    }

    const sql = 'INSERT INTO reviews (status, reviewFor, rating, title, comment, userId, establishmentId, foodId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await query(sql, [status, reviewFor, rating, title, comment, userId, establishmentId, foodId]);
   
    res.status(201).json(convertBigInt({ id: result.insertId, status, reviewFor, rating, title, comment, userId, establishmentId, foodId }));
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, title, comment, reviewFor } = req.body;
    const status = 'UPDATED';  // set status as updated

    // check if the review exists and is not flagged as deleted
    const reviewCheckSql = 'SELECT status FROM reviews WHERE reviewId = ?';
    const reviewCheckResult = await query(reviewCheckSql, [id]);

    // If review is deleted, user should not be able to modify it
    if (reviewCheckResult.length === 0 || reviewCheckResult[0].status === 'DELETED') {
      return res.status(404).json({ error: 'Review not found or has been deleted' });
    }

    const dateModified = new Date(); // set date modified as current date and time

    const sql = 'UPDATE reviews SET status = ?, reviewFor = ?, rating = ?, title = ?, comment = ?, dateModified = ? WHERE reviewId = ?';
    
    await query(sql, [status, reviewFor, rating, title, comment, dateModified, id]);
    res.status(200).json(convertBigInt({ id, status, reviewFor, rating, title, comment, dateModified }));
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const status = 'DELETED';  // flag as deleted so the record stays in db
    const sql = 'UPDATE reviews SET status = ? WHERE reviewId = ?';

    await query(sql, [status, id]);
    
    res.status(204).send();
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get review by id
export const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM reviews WHERE reviewId = ? AND status != "DELETED"';
    const result = await query(sql, [id]);

    if (result.length > 0) {
      res.status(200).json(convertBigInt(result[0]));
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//get review for specific review (estab, food, estab and food)
export const getReviewFor = async (req: Request, res: Response) => {
  try {
    const { reviewFor } = req.query;

    let sql = 'SELECT * FROM reviews WHERE status != "DELETED"';
    const params = [];

    if (reviewFor) {
      sql += ' AND reviewFor = ?';
      params.push(reviewFor);
    }

    const result = await query(sql, params);
    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM reviews WHERE status != "DELETED"';
    const result = await query(sql);
    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
