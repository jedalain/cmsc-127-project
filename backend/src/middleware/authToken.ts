import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

// typescipt doesn't recognize req.userId hence we need an interface to extend default Request
export interface CustomRequest extends Request {
  userId?: number;
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      // token not existing
      return res.status(401).json({ error: "Please authenticate" });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    req.userId = decoded.id as number; // get user id

    next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

// source: https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
