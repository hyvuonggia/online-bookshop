import express from 'express';
import {
    createCategory,
    deleteCategory,
    listCategories,
    readCategory,
    updateCategory,
} from '../controllers/categoryControllers.js';
import { admin, auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(listCategories).post(auth, admin, createCategory);

router
    .route('/:slug')
    .get(auth, admin, readCategory)
    .put(auth, admin, updateCategory)
    .delete(auth, admin, deleteCategory);

export default router;
