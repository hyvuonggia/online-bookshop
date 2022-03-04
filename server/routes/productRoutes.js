import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsLimit,
} from '../controllers/productControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(authCheck, adminCheck, createProduct);
router.route('/:limit').get(getProductsLimit);
router.route('/:slug').delete(authCheck, adminCheck, deleteProduct);

export default router;
