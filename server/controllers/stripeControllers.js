import Stripe from 'stripe';
import User from '../models/userModel.js';
import Cart from '../models/cartModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
    const totalAfterDiscount = req.body.totalAfterDiscount;

    const user = await User.findOne({ email: req.user.email });

    const { cartTotal } = await Cart.findOne({ orderedBy: user._id });

    const finalAmount = totalAfterDiscount
        ? totalAfterDiscount * 100
        : cartTotal * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: 'usd',
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
