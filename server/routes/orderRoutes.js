import express from 'express';
import { createOrder } from '../controllers/orderControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, createOrder);

export default router;
