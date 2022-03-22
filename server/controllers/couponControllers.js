import Coupon from '../models/couponModel.js';

/**
 * @description Create a coupon
 * @route POST /api/coupons
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
export const createCoupon = async (req, res) => {
    try {
        const { name, expiry, discount } = req.body;
        const newCoupon = await new Coupon({ name, expiry, discount });
        await newCoupon.save();
        res.json(newCoupon);
    } catch (error) {
        res.status(400).send('Create coupon failed');
    }
};

/**
 * @description List all coupons
 * @route GET /api/coupons
 * @access public
 *
 * @param {*} req
 * @param {*} res
 */
export const listCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort([['createdAt', 'desc']]);
        res.json(coupons);
    } catch (error) {
        res.status(400).send('Get all coupons failed');
    }
};

/**
 * @description Delete a coupon
 * @route DELETE /api/coupons/:couponId
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
export const deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.couponId);
        res.json({ message: 'Delete coupon success' });
    } catch (error) {
        res.status(400).send('Delete coupon failed');
    }
};
