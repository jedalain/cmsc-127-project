import { Router } from "express";

import {
  addUser,
  fetchProfile,
  getAllUsers,
  loginUser,
} from "../controllers/userController";
import { auth } from "../middleware/authToken";

const router = Router();

router.post("/signup", addUser);
router.post("/login", loginUser);
router.get("/profile", auth, fetchProfile);
router.get("/all", getAllUsers);

export default router;
