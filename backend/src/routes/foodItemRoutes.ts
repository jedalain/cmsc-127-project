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


router.get('/:establishmentId/food-items/:classification', getFoodItemsByTypeAndEstablishment); 
  // http://localhost:8000/food-items/1002/food-items/


router.get('/:establishmentId/food-items', getFoodItemsByEstablishment);
  // localhost:8000/food-items/1002/food-items/MEAT_AND_VEGGIES

export default router;
