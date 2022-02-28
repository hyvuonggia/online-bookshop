import { CREATE_PRODUCT_SUCCESS } from '../constants/productConstants';

export const createProductReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_PRODUCT_SUCCESS:
            return {
                product: payload,
            };
        default:
            return state;
    }
};
