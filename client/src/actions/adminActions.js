import axios from 'axios';
import {
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS,
    SET_ORDER_STATUS_FAIL,
    SET_ORDER_STATUS_SUCCESS,
} from '../constants/adminConstants';

export const getOrders = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };
        const response = await axios.get('/api/admin/orders', config);
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDERS_FAIL,
            payload: error.message,
        });
    }
};

export const setOrderStatus =
    (orderId, orderStatus) => async (dispatch, getState) => {
        try {
            const {
                userLogin: { user },
            } = getState();

            const config = {
                headers: {
                    Authorization: user.token.token,
                },
            };
            const response = await axios.put(
                `/api/admin/orders/${orderId}`,
                { orderStatus },
                config,
            );
            dispatch({
                type: SET_ORDER_STATUS_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: SET_ORDER_STATUS_FAIL,
                payload: error.message,
            });
        }
    };
