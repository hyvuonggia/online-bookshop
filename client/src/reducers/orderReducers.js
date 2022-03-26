import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
} from '../constants/orderConstants';

export const creatOrderReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ORDER_SUCCESS:
            return {
                newOrder: payload,
            };
        case CREATE_ORDER_FAIL:
            return {
                error: payload,
            };
        default:
            return state;
    }
};
