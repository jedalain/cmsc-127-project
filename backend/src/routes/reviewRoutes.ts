import { Router } from "express";
import { auth } from "../middleware/authToken";
import {
  addReview,
  updateReview,
  deleteReview,
  getReview, // by id
  getAllReviews,
  getReviewFor, // // by estab review or by food review
  getAllReviewsWithHighRating,
} from "../controllers/reviewController";

const router = Router();

router.post("/", auth, addReview); // http://localhost:8000/reviews
router.put("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);

//view review by review id
router.get("/byId/:id", getReview); // Fetch review by ID http://localhost:8000/reviews/byId/12

//view all food review for an estab or food item
router.get("/filtered", getReviewFor);
// Fetch reviews by reviewFor http://localhost:8000/reviews/filtered?establishmentId=1001
// or http://localhost:8000/reviews/filtered?foodId=4

//get all reviews
router.get("/all", getAllReviews);
//get all high rating reviews
router.get("/allHighRating", getAllReviewsWithHighRating);

export default router;
