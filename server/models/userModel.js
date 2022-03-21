import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        cart: {
            type: Array,
            default: [],
        },
        address: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

export default User;
