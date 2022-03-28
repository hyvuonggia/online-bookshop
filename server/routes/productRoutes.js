import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProducts,
    // getProductsLimit,
    getProduct,
    updateProduct,
    getProductsByCreatedDate,
    getProductsBySold,
    createProductReview,
    getProductsByRating,
    // searchFilters,
} from '../controllers/productControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(authCheck, adminCheck, createProduct);

// router.route('/limit/:limit').get(getProductsLimit);

router.route('/new-arrivals').post(getProductsByCreatedDate);

router.route('/best-sellers').post(getProductsBySold);

router.route('/most-rated').post(getProductsByRating);

router
    .route('/:slug')
    .get(getProduct)
    .put(authCheck, adminCheck, updateProduct)
    .delete(authCheck, adminCheck, deleteProduct);

router.route('/:slug/reviews').post(authCheck, createProductReview);

export default router;
