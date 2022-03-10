import mongoose from 'mongoose';
import reviewSchema from './reviewModel.js';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        author: {
            type: String,
            default: 'Unknown',
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            // required: true,
        },
        quantity: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        image: {
            type: Object,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
