import { Router } from "express";

import {
  addUser,
  checkOwnership,
  fetchProfile,
  loginUser,
} from "../controllers/userController";
import { auth } from "../middleware/authToken";

const router = Router();

router.post("/signup", addUser);
router.post("/login", loginUser);
router.get("/profile", auth, fetchProfile);
router.post("/check-owner", auth, checkOwnership);

export default router;
