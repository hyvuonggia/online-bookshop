import User from '../models/userModel.js';

/**
 * @description create new user
 * @route POST /api/users
 * @access public
 */
export const createUser = async (req, res) => {
    const { name, email } = req.user;

    const user = await User.findOneAndUpdate(
        { email },
        { name },
        { new: true },
    );

    if (user) {
        console.log('USER UPDATED', user);
        res.json(user);
    } else {
        const newUser = await new User({
            name,
            email,
        }).save();
        console.log('USER CREATED', newUser);
        res.json(newUser);
    }
    // res.json({
    //     data: 'Create user',
    // });
};
