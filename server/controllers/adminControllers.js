import Order from '../models/orderModel.js';

export const getOrders = async (req, res) => {
    const orders = await Order.find({})
        .sort([['createdAt', 'desc']])
        .populate('products.product');
    res.json(orders);
};

export const setOrderStatus = async (req, res) => {
    const { orderId, orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus },
        { new: true },
    );

    res.json(updatedOrder);
};
