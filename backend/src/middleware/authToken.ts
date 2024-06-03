import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secretkey";

// typescipt doesn't recognize req.userId hence we need an interface to extend default Request
export interface CustomRequest extends Request {
  userId?: number;
  role?: string;
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token); // Log the token

    if (!token) {
      return res.status(401).json({ error: "Please authenticate" });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    console.log("Decoded token:", decoded);
    
    req.userId = decoded.id as number; // Log decoded token
    console.log("Decoded ID:", req.userId);

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Please authenticate" });
  }
};

export const adminAuth =(req: CustomRequest, res: Response, next: NextFunction)=>{
  auth(req, res, ()=>{
    if (req.role!== "admin") {
      return res.status(403).json({error: "Access denied. Admins only."});
    }
    next();
  });
};

// source: https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
