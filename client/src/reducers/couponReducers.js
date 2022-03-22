import {
    CREATE_COUPON_FAIL,
    CREATE_COUPON_SUCCESS,
    DELETE_COUPON_FAIL,
    DELETE_COUPON_SUCCESS,
    GET_COUPONS_FAIL,
    GET_COUPONS_SUCCESS,
} from '../constants/couponConstants';

export const createCouponReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_COUPON_SUCCESS:
            return {
                newCoupon: payload,
            };
        case CREATE_COUPON_FAIL:
            return {
                error: payload,
            };
        default:
            return state;
    }
};

export const getCouponsReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_COUPONS_SUCCESS:
            return {
                coupons: payload,
            };
        case GET_COUPONS_FAIL:
            return {
                error: payload,
            };
        default:
            return state;
    }
};

export const deleteCouponReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case DELETE_COUPON_SUCCESS:
            return {
                newCoupon: payload,
            };
        case DELETE_COUPON_FAIL:
            return {
                error: payload,
            };
        default:
            return state;
    }
};