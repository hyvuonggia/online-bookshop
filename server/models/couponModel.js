import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            uppercase: true,
            minlength: [3, 'Too short'],
            maxlength: [12, 'Too long'],
        },

        expiry: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            min: [0, 'Too small'],
            max: [100, 'Too large'],
        },
    },
    { timestamps: true },
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
