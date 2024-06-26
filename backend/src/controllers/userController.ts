import { Request, Response } from "express";
import { query } from "../config/dbConfig";
import { CustomRequest } from "../middleware/authToken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkExistence, convertBigInt } from "./helper";

const SECRET_KEY = "secretkey";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fname, mname, lname, role } = req.body;

    // hash password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("Hashed Password:", hashedPassword);

    const sql =
      "INSERT INTO users (email, password, fname, mname, lname, role) VALUES (?, ?, ?, ?, ?, ?)";

    const result = await query(sql, [
      email,
      password, // insert hashed password
      fname,
      mname,
      lname,
      role,
    ]);

    // generate token
    const userId = result.insertId.toString();
    console.log(userId);

    // Generate token
    const token = jwt.sign({ id: userId, email, role }, SECRET_KEY, {
      expiresIn: "3h",
    });

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

      if (password === user.password) {
        // passwords match, return user data
        // generate token for the user
        const token = jwt.sign(
          { id: user.userId, email: user.email, role: user.role },
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

export const fetchProfile = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    console.log("Authenticated userId:", userId);

    // Check user existence
    console.log("Checking user existence...");
    if (!(await checkExistence("users", "userId", userId))) {
      console.error("Invalid userId:", userId);
      return res.status(400).json({ error: "Invalid userId" });
    }
    console.log("User exists.");

    const { monthYear } = req.query;
    const reviewParams = [];

    const profile = "SELECT fname, mname, lname FROM users WHERE userId = ?";
    let reviews =
      "SELECT * FROM reviews WHERE userId = ? AND status != 'DELETED'";
    const establishments = "SELECT * FROM foodEstablishments WHERE userId = ?";

    reviewParams.push(userId);

    if (monthYear) {
      const [month, year] = (monthYear as string).split(" ");

      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      console.log(endDate);
      endDate.setMonth(endDate.getMonth() + 1);

      reviews += " AND (dateModified >= ? AND dateModified < ?)";
      reviewParams.push(startDate.toISOString());
      reviewParams.push(endDate.toISOString());
    }

    const profileResult = await query(profile, [userId]);
    const reviewsResult = await query(reviews, reviewParams);
    const establishmentsResult = await query(establishments, [userId]);

    res.status(201).json({
      profile: profileResult[0],
      reviews: reviewsResult,
      establishments: establishmentsResult,
    });
  } catch (error) {}
};

export const checkOwnership = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    console.log("Authenticated userId:", userId);

    // Check user existence
    console.log("Checking user existence...");
    if (!(await checkExistence("users", "userId", userId))) {
      console.error("Invalid userId:", userId);
      return res.status(400).json({ error: "Invalid userId" });
    }
    console.log("User exists.");

    const { establishmentId, foodId } = req.body;

    if (!establishmentId && !foodId) {
      return res
        .status(400)
        .json({ error: "Either establishmentId or foodId must be provided" });
    }

    let sql = "";
    let params;
    if (establishmentId) {
      sql =
        "SELECT userId FROM foodEstablishments WHERE userId = ? AND establishmentId = ?";
      params = [userId, establishmentId];
    } else if (foodId) {
      //query with establishments first to get ref to userId
      sql = "SELECT establishmentId FROM foodItems WHERE foodId = ?";
      params = [foodId];
      const establishmentResult = await query(sql, params);

      if (establishmentResult.length === 0) {
        return res.status(200).json({ isOwner: false });
      }

      const establishmentIdFromFood = establishmentResult[0].establishmentId;

      sql =
        "SELECT userId FROM foodEstablishments WHERE userId = ? AND establishmentId = ?";
      params = [userId, establishmentIdFromFood];
    }

    const result = await query(sql, params);

    if (result.length === 0) {
      return res.status(200).json({ isOwner: false });
    }

    return res.status(200).json({ isOwner: true });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const checkIfAdmin = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    console.log("Authenticated userId:", userId);

    // Check user existence
    console.log("Checking user existence...");
    if (!(await checkExistence("users", "userId", userId))) {
      console.error("Invalid userId:", userId);
      return res.status(400).json({ error: "Invalid userId" });
    }
    console.log("User exists.");

    const sql = "SELECT * FROM users WHERE userId = ? AND role = 'admin'";
    const params = [userId];

    const result = await query(sql, params);

    if (result.length === 0) {
      return res.status(200).json({ isLoggedIn: true, isAdmin: false });
    }

    return res.status(200).json({ isLoggedIn: true, isAdmin: true });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM users WHERE role != "admin"';
    const result = await query(sql);

    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
