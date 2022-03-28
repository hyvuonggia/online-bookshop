import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

/**
 * @description Create new order
 * @route POST /api/orders
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const createOrder = async (req, res) => {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email });
    const { products } = await Cart.findOne({ orderedBy: user._id });

    const newOrder = await new Order({
        paymentIntent,
        orderedBy: user._id,
        products,
    });

    const bulkOption = products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -1, sold: +1 } },
            },
        };
    });

    await Product.bulkWrite(bulkOption, {});

    await newOrder.save();

    res.json(newOrder);
};

/**
 * @description Get user orders
 * @route GET /api/orders/user
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const getUserOrders = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });

    const orders = await Order.find({ orderedBy: user._id })
        .sort([['createdAt', 'desc']])
        .populate('products.product');

    res.json(orders);
};

/**
 * @description Create cash orders
 * @route POST /api/orders/cash
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const createCashOrder = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    const { total } = req.body;
    const paymentIntent = {
        amount: total * 100,
    };
    const { products } = await Cart.findOne({ orderedBy: user._id });

    const newOrder = await new Order({
        paymentIntent,
        paymentType: 'cash',
        orderedBy: user._id,
        products,
    });

    const bulkOption = products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -1, sold: +1 } },
            },
        };
    });

    await Product.bulkWrite(bulkOption, {});

    await newOrder.save();

    res.json(newOrder);
};
