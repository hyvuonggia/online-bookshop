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
