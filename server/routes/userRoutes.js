import express from 'express';
import {
    createUser,
    getCurrentUser,
    saveAddress,
    getAddress,
    removeFromWishlist,
    addToWishlist,
    getWishlist,
} from '../controllers/userControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, createUser);
router
    .route('/user/address')
    .post(authCheck, saveAddress)
    .get(authCheck, getAddress);
router.route('/current-user').get(authCheck, getCurrentUser);
router.route('/current-admin').get(authCheck, adminCheck, getCurrentUser);
router
    .route('/user/wishlist')
    .post(authCheck, addToWishlist)
    .get(authCheck, getWishlist);
router.route('/user/wishlist').put(authCheck, removeFromWishlist);

export default router;
