import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hello world from user route',
    });
});

export default router;
