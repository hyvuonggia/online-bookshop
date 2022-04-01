import Product from '../models/productModel.js';
import User from '../models/userModel.js';

/**
 * @description create new user
 * @route POST /api/users
 * @access public
 */
export const createUser = async (req, res) => {
    const { name, email } = req.user;

    // TODO: Prevent register existed email address

    const user = await User.findOneAndUpdate(
        { email },
        { name: email.split('@')[0] },
        { new: true },
    );

    if (user) {
        // console.log('USER UPDATED', user);
        res.json(user);
    } else {
        const newUser = await new User({
            name: email.split('@')[0],
            email,
        }).save();
        // console.log('USER CREATED', newUser);
        res.json(newUser);
    }
};

/**
 * @description get current user
 * @route GET /api/users/current-user
 */
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            res.status(404).json('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
    }
};

/**
 * @description Save user address
 * @route POST /api/users/user/address
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const saveAddress = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { address: req.body.address },
        );
        res.json(user);
    } catch (error) {
        res.status(400).send('Save address failed');
    }
};

/**
 * @description Get user address
 * @route GET /api/users/user/address
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const getAddress = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        res.json(user.address);
    } catch (error) {
        res.status(400).send('Save address failed');
    }
};

/**
 * @description Add product to wishlist
 * @route POST /api/users/user/wishlist
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const addToWishlist = async (req, res) => {
    try {
        const { slug } = req.body;
        const product = await Product.findOne({ slug });
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { $addToSet: { wishlist: product._id } },
            { new: true },
        );
        res.json({ message: 'Added to wishlist' });
    } catch (error) {
        res.status(400).json({ error: 'Added to wishlist failed' });
    }
};

/**
 * @description Get wishlist products
 * @route GET /api/users/user/wishlist
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const getWishlist = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).populate({
        path: 'wishlist',
        populate: {
            path: 'category',
        },
    });
    res.json(user.wishlist);
};

/**
 * @description Remove product from wishlist
 * @route PUT /api/users/user/wishlist
 * @access private
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const removeFromWishlist = async (req, res) => {
    try {
        const { slug } = req.body;
        const product = await Product.findOne({ slug });
        console.log('==================>product', product);
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { $pull: { wishlist: product._id } },
            { new: true },
        );
        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(400).json({ error: 'Removed from wishlist failed' });
    }
};
