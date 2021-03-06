import express from 'express';
import {
    getCart,
    userCart,
    applyCouponToCart,
} from '../controllers/cartControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authCheck, getCart).post(authCheck, userCart);
router.route('/coupon').post(authCheck, applyCouponToCart);

export default router;
