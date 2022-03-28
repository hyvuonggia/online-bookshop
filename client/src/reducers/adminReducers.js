import {
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS,
    SET_ORDER_STATUS_FAIL,
    SET_ORDER_STATUS_SUCCESS,
} from '../constants/adminConstants';

export const getOrdersReducer = (state = { orders: [] }, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ORDERS_SUCCESS:
            return {
                orders: payload,
            };
        case GET_ORDERS_FAIL:
            return {
                error: payload,
            };
        default:
            return state;
    }
};

export const setOrderStatusReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_ORDER_STATUS_SUCCESS:
            return {
                updatedOrder: payload,
            };
        case SET_ORDER_STATUS_FAIL:
            return {
                error: payload,
            };
        default:
            return state;
    }
};
