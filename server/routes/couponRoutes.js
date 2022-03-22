import express from 'express';
import { createCoupon, deleteCoupon, listCoupons } from '../controllers/couponControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, adminCheck, createCoupon).get(listCoupons);
router.route('/:couponId').delete(authCheck, adminCheck, deleteCoupon);

export default router;
