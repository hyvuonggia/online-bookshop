/**
 * @description create new user
 * @route POST /api/users
 * @access public
 */
export const createUser = (req, res) => {
    res.json({
        message: 'create new user',
    });
};

/**
 * @description update user
 * @route PUT /api/users/:id
 * @access public
 */
export const updateUser = (req, res) => {
    res.json({
        message: 'update user',
    });
};
