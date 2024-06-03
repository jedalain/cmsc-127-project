import { Request, Response } from "express";
import { query } from "../config/dbConfig";
import { convertBigInt } from "./helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secretkey";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fname, mname, lname, role } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("Hashed Password:", hashedPassword);

    const sql =
      "INSERT INTO users (email, password, fname, mname, lname, role) VALUES (?, ?, ?, ?, ?, ?)";

    const result = await query(sql, [
      email,
      hashedPassword, // insert hashed password
      fname,
      mname,
      lname,
      role,
    ]);

    // generate token
    const token = jwt.sign(
      { id: result.insertId.toString(), email, role },
      SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );

    res.status(201).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//check if user that tries to log in realy exist
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";

    const result = await query(sql, [email]);

    if (result.length > 0) {
      // check if user existing
      const user = result[0];

      // check if password is valid and existing
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // passwords match, return user data
        // generate token for the user
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          SECRET_KEY,
          { expiresIn: "1h" }
        );

        // return token
        res.status(200).json({ token: token });
      } else {
        // passwords do not match
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      // user doesn't exist
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
