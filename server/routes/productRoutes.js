import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsLimit,
    getProduct,
} from '../controllers/productControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(authCheck, adminCheck, createProduct);
router.route('/limit/:limit').get(getProductsLimit);
router
    .route('/:slug')    
    .get(getProduct)
    .delete(authCheck, adminCheck, deleteProduct);

export default router;
