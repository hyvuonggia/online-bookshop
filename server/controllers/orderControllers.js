import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

export const createOrder = async (req, res) => {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email });
    const { products } = await Cart.findOne({ orderedBy: user._id });

    const newOrder = await new Order({
        paymentIntent,
        orderedBy: user._id,
        products,
    });

    await newOrder.save();

    res.json(newOrder);
};
