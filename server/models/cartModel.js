import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                price: Number,
            },
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
