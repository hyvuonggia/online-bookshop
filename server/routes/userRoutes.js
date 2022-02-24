import express from 'express';
import { createUser, getCurrentUser } from '../controllers/userControllers.js';
import { admin, auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(auth, createUser);
// router.route('/:id').put(auth, updateUser);
router.route('/current-user').get(auth, getCurrentUser);
router.route('/current-admin').get(auth, admin, getCurrentUser);

export default router;
