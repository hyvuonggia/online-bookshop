import Cart from '../models/cartModel.js';
import Coupon from '../models/couponModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

/**
 * @description Save user cart
 * @route POST /api/cart
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const userCart = async (req, res) => {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email });

    //check if cart with logged in user id already exist
    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id });

    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log('remove old cart');
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i].product;

        let { price } = await Product.findById(cart[i].product).select('price');
        object.price = price;

        products.push(object);
    }

    console.log('products ---->', products);

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal += products[i].price;
    }

    console.log('cartTotal ---->', cartTotal);

    let newCart = new Cart({
        products,
        cartTotal,
        orderedBy: user._id,
    });

    await newCart.save();

    console.log('newCart ---->', newCart);
    res.json({ ok: true });
};

/**
 * @description Get user cart
 * @route GET /api/cart
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const getCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOne({ orderedBy: user._id }).populate(
        'products.product',
    );

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
};

export const applyCouponToCart = async (req, res) => {
    try {
        const { coupon } = req.body;
        const validCoupon = await Coupon.findOne({ name: coupon.name });
        if (validCoupon) {
            console.log('VALID COUPON', validCoupon);
            const user = await User.findOne({ email: req.user.email });
            const { products, cartTotal } = await Cart.findOne({
                orderedBy: user._id,
            }).populate('products.product', '_id title price');
            console.log(
                'cartTotal',
                cartTotal,
                'discount',
                validCoupon.discount,
            );
            const totalAfterDiscount = cartTotal * (discount / 100).toFixed(2);
            await Cart.findOneAndUpdate(
                { orderedBy: user._id },
                { totalAfterDiscount },
                { new: true },
            );
            res.send(totalAfterDiscount);
        } else {
            res.status(404).send('Coupon not found');
        }
    } catch (error) {
        throw new Error('Apply coupon failed');
    }
};
