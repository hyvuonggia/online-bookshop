import express from 'express';
import { upload } from '../controllers/cloudinaryControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/upload').post(upload);

export default router;
