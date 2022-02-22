import express from 'express';
import { createUser, getCurrentUser } from '../controllers/userControllers.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authCheck, createUser);
// router.route('/:id').put(authCheck, updateUser);
router.route('/current-user').get(authCheck, getCurrentUser)

export default router;
