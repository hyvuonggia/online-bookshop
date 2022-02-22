import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB CONNECTED'))
    .catch((error) => console.error(error));

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});