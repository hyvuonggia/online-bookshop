import Cart from '../models/cartModel.js';
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
