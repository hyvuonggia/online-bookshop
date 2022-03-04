import express from 'express';
import {
    createProduct,
    getProducts,
    getProductsLimit,   
} from '../controllers/productControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(authCheck, adminCheck, createProduct);
router.route('/:limit').get(getProductsLimit);

export default router;
