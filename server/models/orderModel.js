import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
            },
        ],
        paymentIntent: {},
        paymentType: {
            type: String,
            default: 'card',
            enum: ['cash', 'card'],
        },
        orderStatus: {
            type: String,
            default: 'Not processed',
            enum: [
                'Not processed',
                'Cash on Delivery',
                'Processing',
                'Ready to deliver',
                'Delivering',
                'Completed',
                'Cancelled',
            ],
        },
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
