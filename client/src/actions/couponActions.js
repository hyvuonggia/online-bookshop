import axios from 'axios';
import {
    CREATE_COUPON_FAIL,
    CREATE_COUPON_SUCCESS,
    DELETE_COUPON_FAIL,
    DELETE_COUPON_SUCCESS,
    GET_COUPONS_FAIL,
    GET_COUPONS_SUCCESS,
} from '../constants/couponConstants';

export const createCoupon = (coupon) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.post(`/api/coupons`, { coupon }, config);
        dispatch({
            type: CREATE_COUPON_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_COUPON_FAIL,
            payload: error.response.data,
        });
    }
};

export const getCoupons = () => async (dispatch) => {
    try {
        const response = await axios.get(`/api/coupons`);
        dispatch({
            type: GET_COUPONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_COUPONS_FAIL,
            payload: error.response.data,
        });
    }
};

export const deleteCoupon = (couponId) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.delete(`/api/coupons/${couponId}`, config);
        dispatch({
            type: DELETE_COUPON_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_COUPON_FAIL,
            payload: error.response.data,
        });
    }
};
