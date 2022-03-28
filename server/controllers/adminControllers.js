import Order from '../models/orderModel.js';

/**
 * @description List all orders
 * @route GET /api/admin/orders
 * @access private/admin
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getOrders = async (req, res) => {
    const orders = await Order.find({})
        .sort([['createdAt', 'desc']])
        .populate('products.product')
        .populate('orderedBy');
    res.json(orders);
};

/**
 * @description Update order status
 * @route PUT /api/admin/orders/:orderId
 * @access private/admin
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const setOrderStatus = async (req, res) => {
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.orderId,
        { orderStatus },
        { new: true },
    );

    res.json(updatedOrder);
};
