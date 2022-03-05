import express from 'express';
import {
    createCategory,
    deleteCategory,
    listCategories,
    getCategory,
    updateCategory,
} from '../controllers/categoryControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(listCategories)
    .post(authCheck, adminCheck, createCategory);

router
    .route('/:slug')
    .get(getCategory)
    .put(authCheck, adminCheck, updateCategory)
    .delete(authCheck, adminCheck, deleteCategory);

export default router;
