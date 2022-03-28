import express from 'express';
import { getOrders, setOrderStatus } from '../controllers/adminControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/orders').get(authCheck, adminCheck, getOrders);
router.route('/orders/:orderId').put(authCheck, adminCheck, setOrderStatus);

export default router;
