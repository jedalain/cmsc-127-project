import { Request, Response } from 'express';
import { dbConfig } from '../config/dbConfig';
import { ResultSetHeader } from 'mysql2';

const getAllEstablishment = async (req: Request, res: Response) => {
  try {
    const [rows] = await dbConfig.query('SELECT * FROM foodestablishments');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const createEstablishment = async (req: Request, res: Response) => {
    try {
        const { name, address, avgRating, userId } = req.body;
        const [result] = await dbConfig.query<ResultSetHeader>(
        'INSERT INTO foodestablishments (establishmentId, name, address, avgRating, userId) VALUES (UUID(), ?, ?, ?, ?)',
        [name, address, avgRating, userId]
        );
        res.status(201).json({ establishmentId: result.insertId });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const editEstablishment = async (req: Request, res: Response) => {
    try {
        const { name, address, avgRating, userId } = req.body;
        const [result] = await dbConfig.query<ResultSetHeader>(
        'INSERT INTO foodestablishments (establishmentId, name, address, avgRating, userId) VALUES (UUID(), ?, ?, ?, ?)',
        [name, address, avgRating, userId]
        );
        res.status(201).json({ establishmentId: result.insertId });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteEstablishment = async (req: Request, res: Response) => {
    try {
        await dbConfig.query('DELETE FROM foodestablishments WHERE establishmentId = ?', [req.params.establishmentId]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};


export { getAllEstablishment, createEstablishment, deleteEstablishment, editEstablishment };