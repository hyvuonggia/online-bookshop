import express from 'express';
import { upload } from '../controllers/cloudinaryControllers.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/upload').post(authCheck, adminCheck, upload);

export default router;
