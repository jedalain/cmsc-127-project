import { Router } from "express";

import {
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodItem,
  getAllFoodItems,
  getFoodItemsByEstablishment,
  getFoodItemsByTypeAndEstablishment,
  getAllFoodItemsClassification,
} from "../controllers/foodItemController";

const router = Router();

router.post("/", addFoodItem);
router.put("/:id", updateFoodItem);
router.delete("/:id", deleteFoodItem);
router.get("/:id", getFoodItem);
router.get("/", getAllFoodItems);

// http://localhost:8000/food-items/establishment/1000/MEAT
router.get(
  "/establishment/:establishmentId/:classification",
  getFoodItemsByTypeAndEstablishment
);

// http://localhost:8000/food-items/establishment/1000/
// OR
// http://localhost:8000/food-items/establishment/1000?byPrice=true
router.get("/establishment/:establishmentId", getFoodItemsByEstablishment);
router.get("/get/classifications", getAllFoodItemsClassification);

export default router;
