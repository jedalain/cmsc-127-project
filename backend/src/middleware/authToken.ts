import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = 'secretkey';

// typescipt doesn't recognize req.userId hence we need an interface to extend default Request
export interface CustomRequest extends Request {
    token: string | JwtPayload;
    userId: number; // extract user id
}


//verify and decode the 
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        (req as CustomRequest).token = decoded;
        (req as CustomRequest).userId = decoded.id as number // get user id

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};


// source: https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1