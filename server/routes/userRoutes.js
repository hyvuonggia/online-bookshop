import express from 'express';
import { createUser, updateUser } from '../controllers/userControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, createUser);
router.route('/:id').put(authCheck, updateUser);

export default router;
