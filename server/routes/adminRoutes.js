import express from 'express';
import { getOrders, setOrderStatus } from '../controllers/adminControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/orders').get(authCheck, adminCheck, getOrders);
router.route('/set-order-status').put(authCheck, adminCheck, setOrderStatus);

export default router;
