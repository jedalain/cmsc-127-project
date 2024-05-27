import { Router } from 'express';

import { addUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/signup', addUser);
router.post('/login', loginUser);

export default router;
