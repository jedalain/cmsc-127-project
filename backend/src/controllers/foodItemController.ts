import { Request, Response } from 'express';
import { query } from '../config/dbConfig';
import { checkExistence, convertBigInt } from './helper';

export const addFoodItem = async (req: Request, res: Response) => {
  try {
    const { classification, name, price, establishmentId } = req.body;

    // Check if establishmentId exists
    if (!await checkExistence('foodEstablishments', 'establishmentId', establishmentId)) {
      return res.status(400).json({ error: 'Invalid establishmentId' });
    }

    const sql = 'INSERT INTO foodItems (classification, name, price, establishmentId) VALUES (?, ?, ?, ?)';
    const result = await query(sql, [classification, name, price, establishmentId]);
    
    res.status(201).json(convertBigInt({ id: result.insertId, classification, name, price, establishmentId }));
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { classification, name, price } = req.body;

    // Check if food item exists
    if (!await checkExistence('foodItems', 'foodId', id)) {
      return res.status(404).json({ error: 'Food Item not found' });
    }

    const sql = 'UPDATE foodItems SET classification = ?, name = ?, price = ? WHERE foodId = ?';

    await query(sql, [classification, name, price, id]);
    res.status(200).json(convertBigInt({ id, classification, name, price}));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// If a food establishment or food item is deleted, reviews associated with them are also deleted.
export const deleteFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // if food item deleted then delete associated review
    const deleteReviewsSql = 'DELETE FROM reviews WHERE foodId = ?';
    await query(deleteReviewsSql, [id]);

    // delete food item
    const deleteFoodItemSql = 'DELETE FROM foodItems WHERE foodId = ?';
    await query(deleteFoodItemSql, [id]);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get specific food item based on foodId
export const getFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const sql = 'SELECT * FROM foodItems WHERE foodId = ?';

    const result = await query(sql, [id]);

    if (result.length > 0) {
      res.status(200).json(convertBigInt(result[0]));
    } else {
      res.status(404).json({ error: 'Food Item not found' });
    }
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//view all food items
export const getAllFoodItems = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM foodItems';

    const result = await query(sql);

    res.status(200).json(convertBigInt(result));
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//view all food item from an establishment
export const getFoodItemsByEstablishment = async (req: Request, res: Response) => {
  try {
    const { establishmentId } = req.params;

    // Check if establishmentId exists
    if (!await checkExistence('foodEstablishments', 'establishmentId', establishmentId)) {
      return res.status(400).json({ error: 'Invalid establishmentId' });
    }

    const sql = 'SELECT * FROM foodItems WHERE establishmentId = ?';
    const result = await query(sql, [establishmentId]);

    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//view all food item from an establishment
export const getFoodItemsByEstablishmentAccordingToPrice = async (req: Request, res: Response) => {
  try {
    const { establishmentId } = req.params;

    // Check if establishmentId exists
    if (!await checkExistence('foodEstablishments', 'establishmentId', establishmentId)) {
      return res.status(400).json({ error: 'Invalid establishmentId' });
    }

    const sql = 'SELECT * FROM foodItems WHERE establishmentId = ? ORDER BY price';
    const result = await query(sql, [establishmentId]);

    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//view all food item from an estab that belong to a food type
export const getFoodItemsByTypeAndEstablishment = async (req: Request, res: Response) => {
  try {
    const { establishmentId, classification } = req.params;

    // Check if establishmentId exists
    if (!await checkExistence('foodEstablishments', 'establishmentId', establishmentId)) {
      return res.status(400).json({ error: 'Invalid establishmentId' });
    }

    const sql = 'SELECT * FROM foodItems WHERE establishmentId = ? AND classification = ?';
    const result = await query(sql, [establishmentId, classification]);

    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
