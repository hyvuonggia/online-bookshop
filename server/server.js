import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cloudinaryRoutes from './routes/cloudinaryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import morgan from 'morgan';
import path from 'path';

dotenv.config();

const app = express();

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB CONNECTED'))
    .catch((error) => console.error(error));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json({ limit: '5mb' }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/orders', orderRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${port}`,
    );
});
