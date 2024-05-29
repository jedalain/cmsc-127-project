import { Router } from 'express';
import {
  addReview,
  updateReview,
  deleteReview,
  getReview,  // by id
  getAllReviews, 
  getReviewFor // // by estab review or by food review
} from '../controllers/reviewController';

const router = Router();

router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

//view review by review id
router.get('/byId/:id', getReview);  // Fetch review by ID http://localhost:8000/reviews/byId/12

//view all food review for an estab or food item
router.get('/filtered', getReviewFor);  // Fetch reviews by reviewFor http://localhost:8000/reviews/filtered?reviewFor=food
router.get('/all', getAllReviews);

export default router;
