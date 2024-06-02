import { Request, Response } from 'express';
import { query } from '../config/dbConfig';
import { checkExistence, convertBigInt } from './helper';

export const addFoodEstablishment = async (req: Request, res: Response) => {
  try {

    const { name, address, userId } = req.body;
    const sql = 'INSERT INTO foodEstablishments (name, address, userId) VALUES (?, ?, ?)';

    const result = await query(sql, [name, address, userId]);
    res.status(201).json(convertBigInt({ id: result.insertId, name, address, userId }));

  } 

  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateFoodEstablishment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    // check if food estab that we want to update exist
    const exists = await checkExistence('foodEstablishments', 'establishmentId', id);
    if (!exists) {
      return res.status(404).json({ error: 'Food Establishment not found' });
    }

    const sql = 'UPDATE foodEstablishments SET name = ?, address = ? WHERE establishmentId = ?';


    await query(sql, [name, address, id]);
    res.status(200).json(convertBigInt({ id, name, address }));
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// If a food establishment or food item is deleted, reviews associated with them are also deleted.
export const deleteFoodEstablishment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    //check if existing
    const exists = await checkExistence('foodEstablishments', 'establishmentId', id);
    if (!exists) {
      return res.status(404).json({ error: 'Food Establishment not found' });
    }

    // delete associated review
    const deleteReviewsSql = 'DELETE FROM reviews WHERE establishmentId = ?';
    await query(deleteReviewsSql, [id]);


    //delete estab
    const deleteEstablishmentSql = 'DELETE FROM foodEstablishments WHERE establishmentId = ?';
    await query(deleteEstablishmentSql, [id]);

    res.status(204).send();
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// view specific food estab
export const getFoodEstablishment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const sql = 'SELECT * FROM foodEstablishments WHERE establishmentId = ?';
    const result = await query(sql, [id]);


    //check if estab exist
    if (result.length > 0) {
      res.status(200).json(convertBigInt(result[0]));
    } else {
      res.status(404).json({ error: 'Food Establishment not found' });
    }
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// get all food estab
export const getAllFoodEstablishments = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM foodEstablishments';
    
    const result = await query(sql);
    res.status(200).json(convertBigInt(result));
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
