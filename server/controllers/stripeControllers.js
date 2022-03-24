import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
