import mongoose from 'mongoose';

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
            required: true,
        },
        quantity: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        // images: {
        //     type: Array,
        // },
        // shipping: {
        //     type: String,
        //     enum: ['Yes', 'No'],
        // },
        // rating: [
        //     {
        //         star: Number,
        //         postedBy: {
        //             type: mongoose.Schema.Types.ObjectId
        //         }
        //     }
        // ]
    },
    { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
