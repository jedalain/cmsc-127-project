import { Router } from 'express';

import {
  addFoodEstablishment,
  updateFoodEstablishment,
  deleteFoodEstablishment,
  getFoodEstablishment,
  getAllFoodEstablishments
} from '../controllers/foodEstablishmentController';

const router = Router();

router.post('/', addFoodEstablishment); // add food estab
router.put('/:id', updateFoodEstablishment); //update
router.delete('/:id', deleteFoodEstablishment); //delete
router.get('/:id', getFoodEstablishment); // get specific estab
router.get('/', getAllFoodEstablishments);  // view all food establishment

export default router;
