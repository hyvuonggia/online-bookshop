import express from 'express';
import {
    createProduct,
    getProducts,
} from '../controllers/productControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(authCheck, adminCheck, createProduct);

export default router;
