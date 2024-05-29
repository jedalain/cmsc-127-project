import { Router } from 'express';

import {
  addFoodEstablishment,
  updateFoodEstablishment,
  deleteFoodEstablishment,
  getFoodEstablishment,
  getAllFoodEstablishments
} from '../controllers/foodEstablishmentController';

const router = Router();

router.post('/', addFoodEstablishment);
router.put('/:id', updateFoodEstablishment);
router.delete('/:id', deleteFoodEstablishment);
router.get('/:id', getFoodEstablishment);
router.get('/', getAllFoodEstablishments);  // view all food establishment

export default router;
