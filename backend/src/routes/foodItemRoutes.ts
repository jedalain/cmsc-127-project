import { Router } from 'express';

import {
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodItem,
  getAllFoodItems
} from '../controllers/foodItemController';

const router = Router();

router.post('/', addFoodItem);
router.put('/:id', updateFoodItem);
router.delete('/:id', deleteFoodItem);
router.get('/:id', getFoodItem);
router.get('/', getAllFoodItems);

export default router;
