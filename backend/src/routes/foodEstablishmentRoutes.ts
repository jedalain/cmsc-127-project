import { Router } from "express";

import {
  addFoodEstablishment,
  updateFoodEstablishment,
  deleteFoodEstablishment,
  getFoodEstablishment,
  getAllFoodEstablishments,
} from "../controllers/foodEstablishmentController";
import { auth } from "../middleware/authToken";

const router = Router();

router.post("/", auth, addFoodEstablishment); // add food estab
router.put("/:id", auth, updateFoodEstablishment); //update
router.delete("/:id", auth, deleteFoodEstablishment); //delete
router.get("/:id", getFoodEstablishment); // get specific estab
router.get("/", getAllFoodEstablishments); // view all food establishment

export default router;
