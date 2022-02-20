import express from 'express';
import { createUser, updateUser } from '../controllers/userControllers.js';

const router = express.Router();

router.route('/').post(createUser);
router.route('/:id').put(updateUser);

export default router;
