import express from 'express';
import { userCart } from '../controllers/cartControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, userCart);

export default router;
