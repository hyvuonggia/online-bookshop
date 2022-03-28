import axios from 'axios';
import {
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_CASH_ORDER_SUCCESS,
    CREATE_CASH_ORDER_FAIL,
} from '../constants/orderConstants.js';

export const createOrder = (stripeResponse) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.post(
            '/api/orders',
            { stripeResponse },
            config,
        );

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.message,
        });
    }
};

export const createCashOrder = (total) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.post('/api/orders/cash', {total}, config);

        dispatch({
            type: CREATE_CASH_ORDER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_CASH_ORDER_FAIL,
            payload: error.message,
        });
    }
};