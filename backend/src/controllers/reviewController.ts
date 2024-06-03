import { Request, Response } from "express";
import { query } from "../config/dbConfig";
import { checkExistence, convertBigInt, avgEstab, avgFoodItem } from "./helper";
import { auth, CustomRequest } from "../middleware/authToken";

export const addReview = async (req: CustomRequest, res: Response) => {
  try {
    const { rating, title, comment, establishmentId, foodId } = req.body;
    const status = "CREATED";

    const userId = req.userId;
    console.log("Authenticated userId:", userId);

    // Check user existence
    console.log("Checking user existence...");
    if (!(await checkExistence("users", "userId", userId))) {
      console.error("Invalid userId:", userId);
      return res.status(400).json({ error: "Invalid userId" });
    }
    console.log("User exists.");

    // Check establishment existence
    if (establishmentId) {
      console.log("Checking establishment existence...");
      if (
        !(await checkExistence(
          "foodEstablishments",
          "establishmentId",
          establishmentId
        ))
      ) {
        console.error("Invalid establishmentId:", establishmentId);
        return res.status(400).json({ error: "Invalid establishmentId" });
      }
      console.log("Establishment exists.");
    }

    // Check food item existence
    if (foodId) {
      console.log("Checking food item existence...");
      if (!(await checkExistence("foodItems", "foodId", foodId))) {
        console.error("Invalid foodId:", foodId);
        return res.status(400).json({ error: "Invalid foodId" });
      }
      console.log("Food item exists.");
    }

    if (!establishmentId && !foodId) {
      return res
        .status(400)
        .json({ error: "Either establishmentId or foodId must be provided" });
    }

    const sql =
      "INSERT INTO reviews (status, rating, title, comment, userId, establishmentId, foodId) VALUES (?, ?, ?, ?, ?, ?, ?)";
    console.log("SQL:", sql);
    console.log("Parameters:", [
      status,
      rating,
      title,
      comment,
      userId,
      establishmentId || null,
      foodId || null,
    ]);

    const result = await query(sql, [
      status,
      rating,
      title,
      comment,
      userId,
      establishmentId || null,
      foodId || null,
    ]);
    console.log("Insert result:", result);

    if (establishmentId) {
      await avgEstab(establishmentId);
    }

    if (foodId) {
      await avgFoodItem(foodId);
    }

    res.status(201).json(
      convertBigInt({
        id: result.insertId,
        status,
        rating,
        title,
        comment,
        userId,
        establishmentId,
        foodId,
      })
    );
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, title, comment } = req.body;
    const status = "UPDATED"; // set status as updated

    // check if the review exists and is not flagged as deleted
    const reviewCheckSql = "SELECT status FROM reviews WHERE reviewId = ?";
    const reviewCheckResult = await query(reviewCheckSql, [id]);

    // If review is deleted, user should not be able to modify it
    if (
      reviewCheckResult.length === 0 ||
      reviewCheckResult[0].status === "DELETED"
    ) {
      return res
        .status(404)
        .json({ error: "Review not found or has been deleted" });
    }

    const { establishmentId, foodId } = reviewCheckResult[0]; // extract ids from the query
    const dateModified = new Date(); // set date modified as current date and time

    const sql =
      "UPDATE reviews SET status = ?, rating = ?, title = ?, comment = ?, dateModified = ? WHERE reviewId = ?";

    await query(sql, [status, rating, title, comment, dateModified, id]);

    //update review
    if (establishmentId) {
      await avgEstab(establishmentId);
    }

    if (foodId) {
      await avgFoodItem(foodId);
    }

    res.status(200).json(
      convertBigInt({
        id,
        status,
        rating,
        title,
        comment,
        dateModified,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const status = "DELETED"; // flag as deleted so the record stays in db

    //check if review that we want to delete exist
    const reviewCheckSql =
      "SELECT establishmentId, foodId, reviewId FROM reviews WHERE reviewId = ?";
    const reviewCheckResult = await query(reviewCheckSql, [id]);

    if (reviewCheckResult.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    const { establishmentId, foodId } = reviewCheckResult[0]; // extract id from the query
    const sql = "UPDATE reviews SET status = ? WHERE reviewId = ?";

    await query(sql, [status, id]);

    //UPDATE REVIEW

    if (establishmentId) {
      await avgEstab(establishmentId);
    }

    if (foodId) {
      await avgFoodItem(foodId);
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get review by id
export const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql =
      'SELECT * FROM reviews WHERE reviewId = ? AND status != "DELETED"';
    const result = await query(sql, [id]);

    if (result.length > 0) {
      res.status(200).json(convertBigInt(result[0]));
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get review for specific review (review for estab or for food)
export const getReviewFor = async (req: Request, res: Response) => {
  try {
    const { establishmentId, foodId, monthYear } = req.query;

    // Validate query parameters
    if (!establishmentId && !foodId) {
      return res
        .status(400)
        .json({ error: "Either establishmentId or foodId must be provided" });
    }

    let sql = 'SELECT * FROM reviews WHERE status != "DELETED"';
    const params = [];

    // Add establishmentId to the query if provided
    if (establishmentId) {
      sql += " AND establishmentId = ?";
      params.push(establishmentId);
    }

    // Add foodId to the query if provided
    if (foodId) {
      sql += " AND foodId = ?";
      params.push(foodId);
    }

    if (monthYear) {
      const [month, year] = (monthYear as string).split(" ");

      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      console.log(endDate);
      endDate.setMonth(endDate.getMonth() + 1);

      sql += " AND (dateModified >= ? AND dateModified < ?)";
      params.push(startDate.toISOString());
      params.push(endDate.toISOString());
    }

    const result = await query(sql, params);
    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all review except deleted
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM reviews WHERE status != "DELETED"';
    const result = await query(sql);

    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// get all review except deleted
export const getAllReviewsWithHighRating = async (
  req: Request,
  res: Response
) => {
  try {
    const sql =
      'SELECT * FROM reviews WHERE status != "DELETED" AND rating >= 4 ORDER BY rating';
    const result = await query(sql);

    res.status(200).json(convertBigInt(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
