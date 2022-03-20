import express from 'express';
import { getCart, userCart } from '../controllers/cartControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authCheck, getCart).post(authCheck, userCart);

export default router;
