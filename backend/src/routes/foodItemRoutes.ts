import { Router } from 'express';

import {
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodItem,
  getAllFoodItems,
  getFoodItemsByEstablishment,
  getFoodItemsByTypeAndEstablishment
} from '../controllers/foodItemController';

const router = Router();

router.post('/', addFoodItem);
router.put('/:id', updateFoodItem);
router.delete('/:id', deleteFoodItem);
router.get('/:id', getFoodItem);
router.get('/', getAllFoodItems);
router.get('/establishments/:establishmentId/food-items', getFoodItemsByEstablishment);
router.get('/establishments/:establishmentId/food-items/:classification', getFoodItemsByTypeAndEstablishment);

export default router;
