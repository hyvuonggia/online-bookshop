import express from 'express';
import {
    createOrder,
    getUserOrders,
    createCashOrder,
} from '../controllers/orderControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, createOrder);
router.route('/cash').post(authCheck, createCashOrder);
router.route('/user').get(authCheck, getUserOrders);

export default router;
