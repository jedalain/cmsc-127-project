import { Request, Response } from "express";
import { query } from "../config/dbConfig";
import { convertBigInt } from "./helper";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fname, mname, lname, role } = req.body;
    const sql =
      "INSERT INTO users (email, password, fname, mname, lname, role) VALUES (?, ?, ?, ?, ?, ?)";

    const result = await query(sql, [
      email,
      password,
      fname,
      mname,
      lname,
      role,
    ]);

    res
      .status(201)
      .json(
        convertBigInt({ id: result.insertId, email, fname, mname, lname, role })
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//check if user that tries to lof in realy exist
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    const result = await query(sql, [email, password]);

    if (result.length > 0) {
      // user exists, return user data
      res.status(200).json(convertBigInt(result[0]));
    } else {
      // user doesn't exist or invalid credentials
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
