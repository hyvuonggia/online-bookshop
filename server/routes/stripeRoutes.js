import express from 'express';
import { createPaymentIntent } from '../controllers/stripeControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/create-payment-intent').post(authCheck, createPaymentIntent);

export default router;
