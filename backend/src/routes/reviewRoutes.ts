import { Router } from 'express';

import {
  addReview,
  updateReview,
  deleteReview,
  getReview,
  getAllReviews
} from '../controllers/reviewController';

const router = Router();

router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/:id', getReview);
router.get('/', getAllReviews);

export default router;
