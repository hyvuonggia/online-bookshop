import express from 'express';
import { createProduct } from '../controllers/productControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, adminCheck, createProduct);

export default router;
